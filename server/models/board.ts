const getBoardMembers = async (knex: any, boardId: any) => {
  const rows = await knex('User as u')
    .innerJoin('user_boards as ub', 'ub.userId', 'u.id')
    .where('ub.boardId', boardId)
    .select('u.*');

  return rows;
};

const getCardMembers = async (knex: any, cardId: any) => {
  const rows = await knex('User as u')
    .innerJoin('user_boards as ub', 'ub.userId', 'u.id')
    .innerJoin('card_members as cm', 'cm.userBoardId', 'ub.id')
    .where('cm.cardId', cardId)
    .select('u.*');

  return rows;
};

const getBoardDetails = async (knex: any, boardId: any) => {
  const rows = await knex('boards').select('*').where('id', boardId);

  return rows[0];
};

const getOwnedBoards = async (knex: any, userId: any) => {
  const rows = await knex('boards').select('*').where('owner', userId);

  return rows;
};

const getMemberBoards = async (knex: any, userId: any) => {
  const rows = await knex('boards as b')
    .innerJoin('user_boards as ub', 'ub.boardId', 'b.id')
    .where('ub.userId', userId)
    .select('b.*');

  return rows;
};

const getOtherBoards = async (knex: any, userId: any) => {
  const subquery = knex('user_boards').where('owner', userId).select('boardId');
  const rows = await knex.select('*').from('boards').where('id', 'not in', subquery);

  return rows;
};

const getListDetails = async (knex: any, listId: any) => {
  const rows = await knex('lists').select('*').where('id', listId);

  return rows[0];
};

const getListsForBoard = async (knex: any, boardId: any) => {
  const rows = await knex('lists').select('*').where('boardId', boardId);

  return rows;
};

const getCardDetails = async (knex: any, cardId: any) => {
  const rows = await knex('cards').select('*').where('id', cardId);

  return rows[0];
};

const getCardsForList = async (knex: any, listId: any) => {
  const rows = await knex('cards').select('*').where('listId', listId);

  return rows;
};

const getCommentsForCard = async (knex: any, cardId: any) => {
  const rows = await knex('comments').select('*').where('cardId', cardId);

  return rows;
};

const createBoard = async (knex: any, inBoard: any) => {
  const board = { ...inBoard };
  board.slug = board.name.toLowerCase().replace(/[^\w-]+/g, '-');
  board.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx: any) => {
      const insertedBoard = await trx('boards').insert(board, 'id');
      board.id = insertedBoard[0];

      await trx('user_boards').insert({
        userId: board.owner,
        boardId: board.id,
        updatedBy: board.updatedBy,
        updatedOn: board.updatedOn,
      });

      return board;
    })
    .then((addedBoard: any) => addedBoard)
    .catch((e: any) => {
      throw new Error('Board add failed: ' + e.message);
    });
};

const createList = async (knex: any, list: any) => {
  list.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx: any) => {
      const maxPos = await trx('lists').max('position as a').where('boardId', list.boardId);
      let position = 1024;
      try {
        if (maxPos[0].a !== null) {
          position += parseInt(maxPos[0].a);
        }
      } catch (e) {
        // eslint-disable-next-line
      }
      list.position = position;

      const insertedList = await trx('lists').insert(list, 'id');
      list.id = insertedList[0];

      return list;
    })
    .then((addedList: any) => addedList)
    .catch((e: any) => {
      throw new Error('List add failed: ' + e.message);
    });
};

const createCard = async (knex: any, card: any) => {
  card.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx: any) => {
      const maxPos = await trx('cards').max('position as a').where('listId', card.listId);

      let position = 1024;
      try {
        if (maxPos[0].a !== null) {
          position += parseInt(maxPos[0].a);
        }
      } catch (e) {
        // eslint-disable-next-line
      }
      card.position = position;

      const insertedCard = await trx('cards').insert(card, 'id');
      card.id = insertedCard[0];

      return card;
    })
    .then((addedCard: any) => addedCard)
    .catch((e: any) => {
      throw new Error('Card add failed: ' + e.message);
    });
};

const addCardComment = async (knex: any, comment: any) => {
  comment.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx: any) => {
      const insertedComment = await trx('comments').insert(comment, 'id');
      comment.id = insertedComment[0];

      const rows = await trx('cards').select('*').where('id', comment.cardId);
      return rows;
    })
    .then((cards: any) => cards[0])
    .catch((e: any) => {
      throw new Error('Comment add failed: ' + e.message);
    });
};

const addBoardMember = async (knex: any, email: any, userBoard: any) => {
  userBoard.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx: any) => {
      let rows = await trx('User').select('*').where('email', email);
      userBoard.userId = rows[0].id;
      const insertedMember = await trx('user_boards').insert(userBoard, 'id');
      userBoard.id = insertedMember[0];
      rows = await trx('boards').select('*').where('id', userBoard.boardId);
      return rows;
    })
    .then((boards: any) => boards[0])
    .catch((e: any) => {
      throw new Error('Add Board member failed: ' + e.message);
    });
};

const addCardMember = async (knex: any, userId: any, boardId: any, cardMember: any) => {
  cardMember.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx: any) => {
      let rows = await trx('user_boards as ub')
        .where('ub.boardId', boardId)
        .andWhere('ub.userId', userId)
        .select({ id: 'ub.id' });

      cardMember.userBoardId = rows[0].id;
      const insertedMember = await trx('card_members').insert(cardMember, 'id');
      cardMember.id = insertedMember[0];

      rows = await trx('cards').select('*').where('id', cardMember.cardId);
      return rows;
    })
    .then((cards: any) => cards[0])
    .catch((e: any) => {
      throw new Error('Add card member failed: ' + e.message);
    });
};

const removeCardMember = async (knex: any, userId: any, boardId: any, cardId: any) => {
  return knex
    .transaction(async (trx: any) => {
      let rows = await trx('user_boards as ub')
        .innerJoin('card_members as cm', 'cm.userBoardId', 'ub.id')
        .where('ub.boardId', boardId)
        .andWhere('ub.userId', userId)
        .andWhere('cm.cardId', cardId)
        .select({ id: 'cm.id' });

      await trx('card_members').where('id', rows[0].id).del();

      rows = await trx('cards').select('*').where('id', cardId);

      return rows;
    })
    .then((cards: any) => cards[0])
    .catch((e: any) => {
      throw new Error('Remove card member failed: ' + e.message);
    });
};

export default {
  getBoardDetails,
  getBoardMembers,
  getCardMembers,
  getOwnedBoards,
  getMemberBoards,
  getOtherBoards,
  getListDetails,
  getListsForBoard,
  getCardDetails,
  getCardsForList,
  getCommentsForCard,

  createBoard,
  createList,
  createCard,
  addBoardMember,
  addCardMember,
  addCardComment,
  removeCardMember,
};
