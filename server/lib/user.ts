import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import config from '@server/config';
import { mutations } from './queries.session';

const client = new ApolloClient({
  link: createHttpLink({
    uri: config.API_URL,
    fetch: fetch as any,
  }),
  cache: new InMemoryCache(),
});

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ username, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  //
  // const salt = crypto.randomBytes(16).toString('hex')
  // const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  // const user = await DB.createUser({ username, salt, hash })

  return { username, createdAt: Date.now() };
}

export async function findUser({ username, password }) {
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
      url: config.APP_URL,
    },
  };
  const results = await client.mutate({
    mutation: payload.mutation,
    variables: payload.variables,
  });
  // console.log(JSON.stringify(results, null, ' '));
  return (results.errors && { errors: results.errors }) || results.data.login;
}
