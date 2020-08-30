import Account from '../../models/account';

export default {
  user: async (_parent: any, { id }: any, ctx: any) => {
    return Account.getUserDetails(ctx.conn.knex, id);
  },

  currentUser: async (_parent: any, _a: any, ctx: any) => {
    return Account.currentUser(ctx.conn.knex, ctx.token);
  },
};
