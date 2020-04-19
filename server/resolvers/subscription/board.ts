import { pubsub } from '../../helpers/utils';

export default {
  boardCreated: {
    subscribe: () => pubsub.asyncIterator('boardCreated'),
  },
};
