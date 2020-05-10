import { pubsub } from '../../lib/utils';

export default {
  subjectAdded: {
    subscribe: () => pubsub.asyncIterator('subjectAdded'),
  },
};
