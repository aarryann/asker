const { NODE_ENV, MODE_ENV, PORT, APP_SECRET, CERT, DB_URL, GRAPHQL_EXT, HOST, KEY, PROTOCOL, TOKEN_HANDLE, ANALYZE, } = process.env;
const SOCKET_PROTOCOL = PROTOCOL === 'https' ? 'wss' : 'ws';
export default {
  NODE_ENV,
  MODE_ENV,
  PORT,
  ANALYZE,

  API_URL: `${PROTOCOL}://${HOST}:${PORT}/${GRAPHQL_EXT}`,
  APP_URL: `${PROTOCOL}://${HOST}:${PORT}`,
  APP_SECRET,
  CERT,
  DB_URL,
  GRAPHQL_EXT,
  HOST,
  IS_DEV: NODE_ENV === 'development',
  IS_PROD: NODE_ENV === 'production',
  IS_SERVER: typeof window === 'undefined',
  IS_SECURE: PROTOCOL === 'https',
  KEY,
  PROTOCOL,
  SOCKET_PROTOCOL,
  SOCKET_URL: `${SOCKET_PROTOCOL}://${HOST}:${PORT}/${GRAPHQL_EXT}`,
  TOKEN_HANDLE,
};
