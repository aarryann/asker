// eslint-disable-next-line
const getAllSubjects = async (knex, studyId, siteId, tenantId, userId) => {
  const rows = await knex('Subject').select('*');

  return rows;
};

const addSubject = async (knex, subject) => {
  subject.pid = subject.firstName.toLowerCase().replace(/[^\w-]+/g, '-');
  subject.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx) => {
      const insertedSubject = await trx('Subject').insert(subject, 'id');
      subject.id = insertedSubject[0];

      return subject;
    })
    .then((addedSubject) => addedSubject)
    .catch((e) => {
      throw new Error('Registering subject failed: ' + e.message);
    });
};

export default {
  getAllSubjects,

  addSubject,
};
