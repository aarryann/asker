import AccountQuery from './account';
import BoardQuery from './board';
import TenantQuery from './tenant';
import VisitQuery from './visit';

export default {
  Query: {
    ...AccountQuery,
    ...BoardQuery,
    ...TenantQuery,
    ...VisitQuery,
  },
};
