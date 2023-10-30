const { pubsub } = require("../helper");
module.exports = {
  Subscription: {
    txnPool: {
      subscribe(parent, args, ctx, info) {
        return pubsub.subscribe("txnPoolTopic"); //Topic
      },
    },
    txn: {
      subscribe(parent, args, ctx, info) {
        return pubsub.subscribe("txnTopic"); //Topic
      },
    },
    l2txn: {
      subscribe(parent, args, ctx, info) {
        return pubsub.subscribe("l2txnTopic"); //Topic
      },
    },
  },
};
