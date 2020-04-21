import { serialize, parse } from 'cookie';
import config from '@clientconfig/index';

const MAX_AGE = 60 * 60 * 8; // 8 hours

export function setTokenCookie(res, token) {
  const cookie = serialize(config.TOKEN_HANDLE, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res) {
  const cookie = serialize(config.TOKEN_HANDLE, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req);
  return cookies[config.TOKEN_HANDLE];
}
