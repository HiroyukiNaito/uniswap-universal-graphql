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
        // logger.info("txpoolData is creating ===============");
        logger.info({hash: args.newTxnPoolData.hash}, "txpoolData is creating ===============");
        const query = { hash: args.newTxnPoolData.hash };
        const txPoolDetails = await txnPoolModels.findOneAndUpdate(
          query,
          args.newTxnPoolData,
          { upsert: true, new: true }
        );
        logger.info({hash: txPoolDetails.hash}, "=============== txpoolData created");
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
        logger.info({hash: args.newTxnData.hash}, "TransactionData is creating ===============");
        const query = { hash: args.newTxnData.hash };
        const txnDetails = await txnModels.findOneAndUpdate(
          query,
          args.newTxnData,
          { upsert: true, new: true }
        );
        logger.info({hash: txnDetails.hash}, "=============== TransactionData created");
        pubsub.publish("txnTopic", {
          txn: txnDetails,
        });
        return txnDetails;
      } catch (error) {
        return error;
      }
    },
    createBulkTxnData: async (parent, args, ctx, info) => {
      try {
        logger.info(args.newTxnData.map(array=>array.hash), "TransactionData is creating **in Bulk** ===============");
        const txnDetails = await txnModels.insertMany(args.newTxnData);
        logger.info(txnDetails.map(array=>array.hash), "=============== TransactionData created **in Bulk** ");
        pubsub.publish("txnBulkTopic", {
          txnBulk: txnDetails,
        });
        return txnDetails;
      } catch (error) {
        return error;
      }
    },
    createl2TxnData: async (parent, args, ctx, info) => {
      try {
        logger.info({ hash: args.newl2TxnData.hash }, "L2 TransactionData is creating ===============");
        const query = { hash: args.newl2TxnData.hash };
        const l2txnDetails = await l2txnModels.hash.findOneAndUpdate(
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
    createBulkl2TxnData: async (parent, args, ctx, info) => {
      try {
        logger.info(args.newl2TxnData.map(array=>array.hash), "TransactionData is creating **in Bulk** ===============");
        const l2txnDetails = await l2txnModels.insertMany(args.newl2TxnData);
        logger.info(l2txnDetails.map(array=>array.hash), "=============== L2 TransactionData created **in Bulk** ");
        pubsub.publish("l2txnBulkTopic", {
          l2txnBulk: l2txnDetails,
        });
        return l2txnDetails;
      } catch (error) {
        return error;
      }
    },
  },
};
