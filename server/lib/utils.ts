import { PubSub } from 'apollo-server';
import Knex from 'knex';
import jwt from 'jsonwebtoken';

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export const getMe = async (req: any) => {
  try {
    const Authorization = req.get('Authorization');
    const token = Authorization.replace('Bearer ', '');
    const {
      user: { userId },
    }: any = jwt.verify(token, process.env.APP_SECRET!);
    return { userId, token };
  } catch (e) {
    throw new AuthError();
  }
};

export const pubsub = new PubSub();

export const getKnex = () =>
  Knex({
    client: 'pg',
    connection: process.env.DB_URL,
    searchPath: ['knex', 'public'],
  });

export const getUserId = (ctx: any) => ctx.userId;
