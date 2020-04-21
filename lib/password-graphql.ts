import GraphqlLocalStrategy from 'graphql-passport';
import { findUser } from './user';

export const graphqlStrategy = new GraphqlLocalStrategy((email, password, done) => {
  console.log('GraphqlStrategy');
  findUser({ username, password })
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});

export default {};
