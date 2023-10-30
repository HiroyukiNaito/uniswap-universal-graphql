const txnPoolModels = require("../../model/txnPools");
const txnModels = require("../../model/txns");
const l2txnModels = require("../../model/l2txns");

module.exports = {
  RootQuery: {
    txnPoolList: async () => {
      try {
        const getTxn = await txnPoolModels.find();
        return getTxn;
      } catch (error) {
        return error;
      }
    },
    txnList: async () => {
      try {
        const getTxn = await txnModels.find();
        return getTxn;
      } catch (error) {
        return error;
      }
    },
    l2txnList: async () => {
      try {
        const getTxn = await l2txnModels.find();
        return getTxn;
      } catch (error) {
        return error;
      }
    },
  },
};
