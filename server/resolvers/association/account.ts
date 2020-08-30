import Account from '../../models/account';
import Board from '../../models/board';

export default {
  User: {
    ownedBoards: async (user: any, _params: any, ctx: any) => {
      return Board.getOwnedBoards(ctx.conn.knex, user.id);
    },
    memberBoards: async (user: any, _params: any, ctx: any) => {
      return Board.getMemberBoards(ctx.conn.knex, user.id);
    },
    otherBoards: async (user: any, _params: any, ctx: any) => {
      return Board.getOtherBoards(ctx.conn.knex, user.id);
    },
  },

  UserAuth: {
    user: async (userAuth: any, _params: any, ctx: any) => {
      return Account.getUserDetails(ctx.conn.knex, userAuth.userId);
    },
  },
};
