const txnPoolModels = require('../../model/txnPools');
const txnModels = require('../../model/txns');
const l2txnModels = require('../../model/l2txns');
const { pubsub } = require('../helper');

module.exports = {
    RootMutation: {
        createTxnPoolData: async(parent, args, ctx, info) => {
            try {
                console.log('txpoolData create===============', args);
                const query = { 'hash': args.newTxnPoolData.hash };
                const txPoolDetails = await txnPoolModels.findOneAndUpdate(query, args.newTxnPoolData, { upsert: true, new: true });
                console.log('txpoolData create===============', txPoolDetails);
                pubsub.publish('txnPoolTopic', {
                    txnPool: txPoolDetails
                });
                return txPoolDetails;
            } catch (error) {
                return error;
            }
        },
        createTxnData: async(parent, args, ctx, info) => {
            try {
                console.log('TransactionData create===============', args);
                const query = { 'hash': args.newTxnData.hash };
                const txnDetails = await txnModels.findOneAndUpdate(query, args.newTxnData, { upsert: true, new: true });
                console.log('TransactionData create===============', txnDetails);
                pubsub.publish('txnTopic', {
                    txn: txnDetails
                });
                return txnDetails;
            } catch (error) {
                return error;
            }
        },
        createl2TxnData: async(parent, args, ctx, info) => {
            try {
                console.log('L2 TransactionData create===============', args);
                const query = { 'hash': args.newl2TxnData.hash };
                const l2txnDetails = await l2txnModels.findOneAndUpdate(query, args.newl2TxnData, { upsert: true, new: true });
                console.log('L2 Transaction create===============', l2txnDetails);
                pubsub.publish('l2txnTopic', {
                    txn: l2txnDetails
                });
                return l2txnDetails;
            } catch (error) {
                return error;
            }
    }
}
}
