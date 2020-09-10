import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { mutations } from './queries.session';

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    fetch: fetch as any,
  }),
  cache: new InMemoryCache(),
});

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ username, password }: any) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  //
  // const salt = crypto.randomBytes(16).toString('hex')
  // const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  // const user = await DB.createUser({ username, salt, hash })
  if (!password) password = '123';

  return { username, createdAt: Date.now() };
}

export async function findUser({ username, password }: any) {
  // Here you should lookup for the user in your DB and compare the password:
  //
  // const user = await DB.findUser(...)
  // const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
  // const passwordsMatch = user.hash === hash
  const payload = {
    mutation: mutations.login,
    variables: {
      email: username,
      password,
      url: process.env.NEXT_PUBLIC_APP_URL,
    },
  };
  const results = await client.mutate({
    mutation: payload.mutation,
    variables: payload.variables,
  });
  // console.log(JSON.stringify(results, null, ' '));
  return (results.errors && { errors: results.errors }) || results.data.login;
}
