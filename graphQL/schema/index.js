/* building GraphQL Schema */
module.exports = `

scalar Object
scalar JSON
scalar Date

type DecodedData {
    contents: [[Object]]
    deadline: String
  }
  
type Signature {
    _type: String
    networkV: String
    r: String
    s: String
    v: Int
}
type TransactionData {
    _id: ID!
    provider: Object
    blockNumber: Int
    blockHash: String
    hash: String!
    type: Int
    to: String
    from: String
    nonce: Int
    gasLimit: String
    gasPrice: String
    maxPriorityFeePerGas: String
    maxFeePerGas: String
    data: String
    value: String
    chainId: String
    createdAt: Date
    decodedData: DecodedData
    accessList: [String]
    signature: Signature
    blockHeader: BlockHeader
}

type BlockHeader {
    _type: String
    baseFeePerGas: String
    difficulty: String
    extraData: String
    gasLimit: String
    gasUsed: String
    hash: String
    miner: String
    nonce: String
    number: Int!
    parentHash: String
    timestamp: Int
    transactions: [String]
}


input DecodedDataInput {
    contents: [[Object]]
    deadline: String
  }
  
input SignatureInput {
    _type: String
    networkV: String
    r: String
    s: String
    v: Int
}

input TransactionDataInput {
    provider: Object
    blockNumber: Int
    blockHash: String
    hash: String!
    type: Int
    to: String
    from: String
    nonce: Int
    gasLimit: String
    gasPrice: String
    maxPriorityFeePerGas: String
    maxFeePerGas: String
    data: String
    value: String
    chainId: String
    createdAt: Date
    decodedData: DecodedDataInput
    accessList: [String]
    signature: SignatureInput
    blockHeader: BlockHeaderInput
  }

input BlockHeaderInput {
    _type: String
    baseFeePerGas: String
    difficulty: String
    extraData: String
    gasLimit: String
    gasUsed: String
    hash: String
    miner: String
    nonce: String
    number: Int!
    parentHash: String
    timestamp: Int
    transactions: [String]
}

type RootQuery {
    txnPoolList: [TransactionData!]!
    txnList: [TransactionData!]!
    l2txnList: [TransactionData!]!
}

type DeleteRes{
    response:String!
}

type RootMutation {
    createTxnPoolData(newTxnPoolData: TransactionDataInput!): TransactionData!
    createTxnData(newTxnData: TransactionDataInput!): TransactionData!
    createl2TxnData(newl2TxnData: TransactionDataInput!): TransactionData!
}

type Subscription{
    txnPool: TransactionData!
    txn: TransactionData!
    l2txn: TransactionData!
}

schema {
    query: RootQuery
    mutation: RootMutation
    subscription: Subscription
}
`;
