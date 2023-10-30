const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const l1_txnDetails = new Schema({
        provider: { type: Object},
        blockNumber:  { type: Number},
        blockHash: { type: String},
        hash: { type: String},
        type:{ type: Number},
        to:  { type: String},
        from:  { type: String},
        nonce: { type: Number},
        gasLimit: { type: String},
        gasPrice: { type: String},
        maxPriorityFeePerGas: { type: String},
        maxFeePerGas: { type: String},
        data: { type: String},
        value: { type: String},
        chainId: { type: String},
        signature: { type: Object},
        accessList: { type: Array},
        decodedData: { type: Object},
        blockHeader:  { type: Object},
        createdAt:  { type: String},
});
module.exports = mongoose.model('l1_transactions', l1_txnDetails);
