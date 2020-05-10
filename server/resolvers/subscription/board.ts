import { pubsub } from '../../lib/utils';

export default {
  boardCreated: {
    subscribe: () => pubsub.asyncIterator('boardCreated'),
  },
};
