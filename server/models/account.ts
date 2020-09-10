import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUserDetails = async (knex: any, id: any) => {
  const rows = await knex('User').select('*').where('id', id);

  return rows[0];
};

const login = async (knex: any, email: any, password: any, url: any) => {
  try {
    const rows = await knex('Tenant as t')
      .innerJoin('TenantAddress as ta', 'ta.tenantId', 't.id')
      .innerJoin('TenantUser as tu', 'tu.tenantId', 't.id')
      .innerJoin('User as u', 'tu.userId', 'u.id')
      .where('ta.url', url)
      .andWhere('u.email', email)
      .select('u.*');

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid email or password');
    }
    return {
      token: jwt.sign({ user: { userId: user.id } }, process.env.APP_SECRET!),
      userId: user.id,
    };
  } catch (e) {
    throw new Error('Invalid email or password');
  }
};

const currentUser = async (knex: any, token: any) => {
  // TODO: Maybe remove Session table later
  try {
    const rows = await knex('Session as s')
      .innerJoin('User as u', 's.userId', 'u.id')
      .where('s.uid', token)
      .where('s.expiry', '>', 'now()')
      .select('u.*');

    const user = rows[0];
    return {
      userId: user.id,
      token,
    };
  } catch (e) {
    throw new Error(`Invalid token: ${token}`);
  }
};

const signup = async (_knex: any, args: any, ctx: any) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password },
  });

  return {
    userId: user.id,
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET!),
  };
};

export default { getUserDetails, login, currentUser, signup };
