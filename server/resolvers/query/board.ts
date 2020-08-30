import Board from '../../models/board';

export default {
  ownedBoards: async (_parent: any, { userId }: any, ctx: any) => {
    return Board.getOwnedBoards(ctx.conn.knex, userId);
  },
};
