import Board from '../../models/board';

export default {
  // eslint-disable-next-line
  createBoard: async (_parent, { name, inOwner }, ctx, _info) => {
    const owner = inOwner || ctx.userId;
    const board = Board.createBoard(ctx.conn.knex, {
      name,
      owner,
      updatedBy: ctx.userId,
    });
    ctx.conn.pubsub.publish('boardCreated', { boardCreated: board }); // trigger a change to all subscriptions to a new board
    return board;
  },
  createList: async (_parent, { name, boardId }, ctx) => {
    return Board.createList(ctx.conn.knex, {
      name,
      boardId,
      updatedBy: ctx.userId,
    });
  },
  createCard: async (_parent, { name, description, tags, listId }, ctx) => {
    return Board.createCard(ctx.conn.knex, {
      name,
      description,
      tags,
      listId,
      updatedBy: ctx.userId,
    });
  },
  addCardComment: async (_parent, { text, userId, cardId }, ctx) => {
    return Board.addCardComment(ctx.conn.knex, {
      text,
      userId,
      cardId,
      updatedBy: ctx.userId,
    });
  },
  addBoardMember: async (_parent, { email, boardId }, ctx) => {
    return Board.addBoardMember(ctx.conn.knex, email, {
      boardId,
      updatedBy: ctx.userId,
    });
  },
  addCardMember: async (_parent, { userId, boardId, cardId }, ctx) => {
    return Board.addCardMember(ctx.conn.knex, userId, boardId, {
      cardId,
      updatedBy: ctx.userId,
    });
  },
  removeCardMember: async (_parent, { userId, boardId, cardId }, ctx) => {
    return Board.removeCardMember(ctx.conn.knex, userId, boardId, cardId);
  },
};
