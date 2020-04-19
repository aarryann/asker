import { pubsub } from '../../helpers/utils';

export default {
  subjectAdded: {
    subscribe: () => pubsub.asyncIterator('subjectAdded'),
  },
};
