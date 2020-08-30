// eslint-disable-next-line
const getAllSubjects = async (knex: any, _studyId: any, _siteId: any, _tenantId: any, _userId: any) => {
  const rows = await knex('Subject').select('*');

  return rows;
};

const addSubject = async (knex: any, subject: any) => {
  subject.pid = subject.firstName.toLowerCase().replace(/[^\w-]+/g, '-');
  subject.updatedOn = knex.fn.now();
  return knex
    .transaction(async (trx: any) => {
      const insertedSubject = await trx('Subject').insert(subject, 'id');
      subject.id = insertedSubject[0];

      return subject;
    })
    .then((addedSubject: any) => addedSubject)
    .catch((e: any) => {
      throw new Error('Registering subject failed: ' + e.message);
    });
};

export default {
  getAllSubjects,

  addSubject,
};
