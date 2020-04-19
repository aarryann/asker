import Visit from '../../models/visit';

export default {
  allSubjects: async (_, { studyId, siteId }, ctx) => {
    return Visit.getAllSubjects(ctx.conn.knex, studyId, siteId, 1, ctx.userId);
  },
  oneSubject: async (_, _a, ctx) => {
    return Visit.getAllSubjects(ctx.conn.knex, 1, 1, 1, ctx.userId);
  },
};
