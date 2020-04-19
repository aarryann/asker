import AccountMutation from './account';
import BoardMutation from './board';
import VisitMutation from './visit';

export default {
  Mutation: {
    ...AccountMutation,
    ...BoardMutation,
    ...VisitMutation
  }
};
