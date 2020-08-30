import Visit from '../../models/visit';

export default {
  // subjectData = firstName, middleInitial, lastName, gender, dob, isDobApprox
  // eslint-disable-next-line
  addSubject: async (_parent: any, subjectData: any, ctx: any, _info: any) => {
    const subject = Visit.addSubject(ctx.conn.knex, {
      updatedBy: ctx.userId,
      tenantId: ctx.tenantId,
      ...subjectData,
    });
    ctx.conn.pubsub.publish('subjectAdded', {
      subjectAdded: subject,
    }); // trigger a change to all subscriptions to a new subject
    return subject;
  },
};
