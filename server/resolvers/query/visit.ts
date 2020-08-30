import Visit from '../../models/visit';

export default {
  allSubjects: async (_parent: any, { studyId, siteId }: any, ctx: any) => {
    return Visit.getAllSubjects(ctx.conn.knex, studyId, siteId, 1, ctx.userId);
  },
  oneSubject: async (_parent: any, _params: any, ctx: any) => {
    return Visit.getAllSubjects(ctx.conn.knex, 1, 1, 1, ctx.userId);
  },
};
