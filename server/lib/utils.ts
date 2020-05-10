import { PubSub } from 'apollo-server';
import Knex from 'knex';
import jwt from 'jsonwebtoken';
import config from '../config';

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

export const getMe = async (req) => {
  try {
    const Authorization = req.get('Authorization');
    const token = Authorization.replace('Bearer ', '');
    const {
      user: { userId },
    } = jwt.verify(token, config.APP_SECRET);
    return { userId, token };
  } catch (e) {
    throw new AuthError();
  }
};

export const pubsub = new PubSub();

export const getKnex = () =>
  Knex({
    client: 'pg',
    connection: config.DB_URL,
    searchPath: ['knex', 'public'],
  });

export const getUserId = (ctx) => ctx.userId;
