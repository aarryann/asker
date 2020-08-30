import passport from 'passport';
import nextConnect from 'next-connect';
import { localStrategy } from 'server/lib/password-local';
// import { encryptSession } from 'server/lib/iron';
import { setTokenCookie } from 'server/lib/auth-cookies';

const authenticate: any = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use((req, res, next) => {
    // Initialize mocked database
    // Remove this after you add your own database
    next();
  })
  .use(passport.initialize() as any)
  .post(async (req, res) => {
    console.log('Login post');
    try {
      const login = await authenticate('local', req, res);
      // session is the payload to save in the token, it may contain basic info about the user
      const { token } = login;
      // The token is a string with the encrypted session
      // const token = await encryptSession(session);

      setTokenCookie(res, token);
      res.status(200).send({ done: true, status: 200 });
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
