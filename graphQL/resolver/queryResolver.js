const txnPoolModels = require("../../model/txnPools");
const txnModels = require("../../model/txns");
const l2txnModels = require("../../model/l2txns");
const pino = require("pino");
const logger = pino({
  level: process.env.PINO_LOG_LEVEL ?? "info",
  formatters: {
    bindings: (bindings) => ({ pid: bindings.pid, host: bindings.hostname }),
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
const queryLimit = parseInt(process.env.QUERY_LIMIT ?? 1000);

module.exports = {
  RootQuery: {
    txnPoolList: async (_, { limit }) => {
      try {
        limit > queryLimit ? (() => {throw new Error('limit number is greater than query limitation')})()
                           : logger.info(`txnPoollist called with limit: ${limit}`);
        const getTxn = await txnPoolModels.find().sort({'createdAt': -1}).limit(limit);
        return getTxn;
      } catch (error) {
        return error;
      }
    },
    txnList: async (_, { limit }) => {
      try {
        limit > queryLimit ? (() => {throw new Error('limit number is greater than query limitation')})()
                           : logger.info(`txnList called with limit: ${limit}`);
        const getTxn = await txnModels.find().sort({'blockNumber': -1}).limit(limit);
        return getTxn;
      } catch (error) {
        return error;
      }
    },
    l2txnList: async (_, { limit }) => {
      try {
        limit > queryLimit ? (() => {throw new Error('limit number is greater than query limitation')})()
                           : logger.info(`l2txnList called with limit: ${limit}`);
        const getTxn = await l2txnModels.find().sort({'blockNumber': -1}).limit(limit);
        return getTxn;
      } catch (error) {
        return error;
      }
    },
  },
};
