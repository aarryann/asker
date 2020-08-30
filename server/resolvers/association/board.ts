import Account from '../../models/account';
import Board from '../../models/board';

export default {
  Board: {
    owner: async (board: any, _params: any, ctx: any) => {
      return Account.getUserDetails(ctx.conn.knex, board.owner);
    },
    members: async (board: any, _params: any, ctx: any) => {
      return Board.getBoardMembers(ctx.conn.knex, board.id);
    },
    lists: async (board: any, _params: any, ctx: any) => {
      return Board.getListsForBoard(ctx.conn.knex, board.id);
    },
  },

  List: {
    board: async (list: any, _params: any, ctx: any) => {
      return Board.getBoardDetails(ctx.conn.knex, list.boardId);
    },
    cards: async (list: any, _params: any, ctx: any) => {
      return Board.getCardsForList(ctx.conn.knex, list.id);
    },
  },

  Card: {
    list: async (card: any, _params: any, ctx: any) => {
      return Board.getListDetails(ctx.conn.knex, card.listId);
    },
    members: async (card: any, _params: any, ctx: any) => {
      return Board.getCardMembers(ctx.conn.knex, card.id);
    },
    comments: async (card: any, _params: any, ctx: any) => {
      return Board.getCommentsForCard(ctx.conn.knex, card.id);
    },
  },

  Comment: {
    user: async (comment: any, _params: any, ctx: any) => {
      return Account.getUserDetails(ctx.conn.knex, comment.userId);
    },
    card: async (comment: any, _params: any, ctx: any) => {
      return Board.getCardDetails(ctx.conn.knex, comment.cardId);
    },
  },
};
