import * as cookie from 'cookie';

console.log('Inside page');
export default async function post(req, res, next) {
  console.log('Inside post');
  try {
    // Call an authenication graphql to handle the authentication.
    // return UserAuth data type
    res.writeHead(200, {
      'Set-Cookie': cookie.serialize('sid', req.body.token, {
        maxAge: 31536000,
        path: '/',
        httpOnly: true,
      }),
      'Content-Type': 'application/json; charset=utf-8',
    });

    res.end(JSON.stringify(req.body.user));
  } catch (e) {
    console.error('POST /auth/login', e);
  }
}
