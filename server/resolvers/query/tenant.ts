// eslint-disable-next-line
import Tenant from '../../models/tenant';

export default {
  tenantByUrl: async (_parent: any, { url }: any, ctx: any) => {
    // eslint-disable-next-line
    return Tenant.getTenantByUrl(ctx.conn.knex, url);
  },
};
