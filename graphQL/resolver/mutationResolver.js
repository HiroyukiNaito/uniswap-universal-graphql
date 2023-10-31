const txnPoolModels = require("../../model/txnPools");
const txnModels = require("../../model/txns");
const l2txnModels = require("../../model/l2txns");
const { pubsub } = require("../helper");
const pino = require("pino");
const logger = pino({
  level: process.env.PINO_LOG_LEVEL ?? "info",
  formatters: {
    bindings: (bindings) => ({ pid: bindings.pid, host: bindings.hostname }),
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

module.exports = {
  RootMutation: {
    createTxnPoolData: async (parent, args, ctx, info) => {
      try {
        logger.info(args, "txpoolData is creating ===============");
        const query = { hash: args.newTxnPoolData.hash };
        const txPoolDetails = await txnPoolModels.findOneAndUpdate(
          query,
          args.newTxnPoolData,
          { upsert: true, new: true }
        );
        logger.info(txPoolDetails, "=============== txpoolData created");
        pubsub.publish("txnPoolTopic", {
          txnPool: txPoolDetails,
        });
        return txPoolDetails;
      } catch (error) {
        return error;
      }
    },
    createTxnData: async (parent, args, ctx, info) => {
      try {
        logger.info(args, "TransactionData is creating ===============");
        const query = { hash: args.newTxnData.hash };
        const txnDetails = await txnModels.findOneAndUpdate(
          query,
          args.newTxnData,
          { upsert: true, new: true }
        );
        logger.info(txnDetails, "=============== TransactionData created");
        pubsub.publish("txnTopic", {
          txn: txnDetails,
        });
        return txnDetails;
      } catch (error) {
        return error;
      }
    },
    createl2TxnData: async (parent, args, ctx, info) => {
      try {
        logger.info(args, "L2 TransactionData is creating ===============");
        const query = { hash: args.newl2TxnData.hash };
        const l2txnDetails = await l2txnModels.findOneAndUpdate(
          query,
          args.newl2TxnData,
          { upsert: true, new: true }
        );
        logger.info(l2txnDetails, "=============== L2 Transaction created");
        pubsub.publish("l2txnTopic", {
          l2txn: l2txnDetails,
        });
        return l2txnDetails;
      } catch (error) {
        return error;
      }
    },
  },
};
