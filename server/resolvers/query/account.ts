import Account from '../../models/account';

export default {
  user: async (_, { id }, ctx) => {
    return Account.getUserDetails(ctx.conn.knex, id);
  },

  currentUser: async (_p, _a, ctx) => {
    return Account.currentUser(ctx.conn.knex, ctx.token);
  },
};
