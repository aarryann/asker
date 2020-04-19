import BoardSubscription from './board';
import VisitSubscription from './visit';

export default {
  Subscription: {
    ...BoardSubscription,
    ...VisitSubscription,
  },
};
