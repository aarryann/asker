import { config } from 'dotenv';
import path from 'path';

const { NODE_ENV, MODE_ENV, PORT } = process.env;
if (!NODE_ENV || !MODE_ENV || !PORT) {
  throw new Error('Required environment variables are not set');
}
export const getBaseDir = () => {
  return path.resolve(__dirname, NODE_ENV === 'production' ? '../../..' : '../..');
};
export const getPathName = () => {
  const DIR = getBaseDir();
  return `${DIR}/secrets/.env.${NODE_ENV}.${MODE_ENV}`;
};
if (!process.env.HOST) {
  config({ path: getPathName() });
}
const { APP_SECRET, DB_URL, GRAPHQL_EXT, HOST, PROTOCOL, TOKEN_HANDLE, ANALYZE } = process.env;
const SOCKET_PROTOCOL = PROTOCOL === 'https' ? 'wss' : 'ws';
export default {
  NODE_ENV,
  MODE_ENV,
  PORT,
  ANALYZE,

  API_URL: `${PROTOCOL}://${HOST}:${PORT}/${GRAPHQL_EXT}`,
  APP_URL: `${PROTOCOL}://${HOST}:${PORT}`,
  APP_SECRET,
  DB_URL,
  GRAPHQL_EXT,
  HOST,
  IS_DEV: NODE_ENV === 'development',
  IS_PROD: NODE_ENV === 'production',
  IS_SERVER: typeof window === 'undefined',
  IS_SECURE: PROTOCOL === 'https',
  PROTOCOL,
  SOCKET_PROTOCOL,
  SOCKET_URL: `${SOCKET_PROTOCOL}://${HOST}:${PORT}/${GRAPHQL_EXT}`,
  TOKEN_HANDLE,
};
