import Board from '../../models/board';

export default {
  // eslint-disable-next-line
  createBoard: async (_parent: any, { name, inOwner }: any, ctx: any, _info: any) => {
    const owner = inOwner || ctx.userId;
    const board = Board.createBoard(ctx.conn.knex, {
      name,
      owner,
      updatedBy: ctx.userId,
    });
    ctx.conn.pubsub.publish('boardCreated', { boardCreated: board }); // trigger a change to all subscriptions to a new board
    return board;
  },
  createList: async (_parent: any, { name, boardId }: any, ctx: any) => {
    return Board.createList(ctx.conn.knex, {
      name,
      boardId,
      updatedBy: ctx.userId,
    });
  },
  createCard: async (_parent: any, { name, description, tags, listId }: any, ctx: any) => {
    return Board.createCard(ctx.conn.knex, {
      name,
      description,
      tags,
      listId,
      updatedBy: ctx.userId,
    });
  },
  addCardComment: async (_parent: any, { text, userId, cardId }: any, ctx: any) => {
    return Board.addCardComment(ctx.conn.knex, {
      text,
      userId,
      cardId,
      updatedBy: ctx.userId,
    });
  },
  addBoardMember: async (_parent: any, { email, boardId }: any, ctx: any) => {
    return Board.addBoardMember(ctx.conn.knex, email, {
      boardId,
      updatedBy: ctx.userId,
    });
  },
  addCardMember: async (_parent: any, { userId, boardId, cardId }: any, ctx: any) => {
    return Board.addCardMember(ctx.conn.knex, userId, boardId, {
      cardId,
      updatedBy: ctx.userId,
    });
  },
  removeCardMember: async (_parent: any, { userId, boardId, cardId }: any, ctx: any) => {
    return Board.removeCardMember(ctx.conn.knex, userId, boardId, cardId);
  },
};
