import Account from '../../models/account';

export default {
  login: async (_parent: any, { email, password, url }: any, ctx: any) => {
    return Account.login(ctx.conn.knex, email, password, url);
  },
};
