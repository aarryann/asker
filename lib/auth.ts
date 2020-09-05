import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { NextPageContext } from 'next';

export const login = ({ token }: any) => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/profile');
};

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: '/login' });
      ctx.res?.end();
    } else {
      Router.push('/login');
    }
  }

  return token;
};
