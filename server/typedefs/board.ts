export default `
  extend type User {
    ownedBoards: [Board]
    memberBoards: [Board]
    otherBoards: [Board]
  }

  type Board {
    id: ID!
    name: String
    slug: String
    owner: User
    members: [User]
    lists: [List]
  }

  type List {
    id: ID!
    name: String
    position: Int
    board: Board
    cards: [Card]
  }

  type Card {
    id: ID!
    name: String
    description: String
    tags: String
    position: Int
    list: List
    members: [User]
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String
    user: User
    card: Card
  }

  # the schema allows the following query:
  extend type Query {
    ownedBoards(userId: ID!): [Board]
    otherBoards(userId: ID!): [Board]
  }

  # this schema allows the following mutation:
  extend type Mutation {
    createBoard(name: String!, owner: ID): Board
    createList(name: String!, boardId: ID!): List
    createCard(
      name: String!
      description: String
      tags: String
      listId: ID!
    ): Card
    addCardComment(text: String!, userId: ID!, cardId: ID!): Card
    addBoardMember(email: String!, boardId: ID!): Board
    addCardMember(userId: ID!, boardId: ID!, cardId: ID!): Card
    removeCardMember(userId: ID!, boardId: ID!, cardId: ID!): Card
  }

  extend type Subscription {
    boardCreated: Board
  }
`;
