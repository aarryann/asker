import { GraphQLLocalStrategy } from 'graphql-passport';
import { findUser } from './user';

export const graphqlStrategy = new GraphQLLocalStrategy((username, password, done) => {
  findUser({ username, password })
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      done(error);
    });
});

export default {};
