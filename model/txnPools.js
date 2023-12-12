const expireTime = parseInt(process.env.EXPIRE_TIME ?? 2592000);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const l1_txnPoolDetails = new Schema({
        provider: { type: Object},
        blockNumber:  { type: Number},
        blockHash: { type: String},
        hash: { type: String, unique: true, required: true},
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
        createdAt:  { type: Date, index: true, expires: expireTime}
});
module.exports = mongoose.model('l1_txnPools', l1_txnPoolDetails);