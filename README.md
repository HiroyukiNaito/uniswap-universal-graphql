# uniswap-universal-graphql
Store uniswap universal router decoded data to Mongo DB as mutations and distribute decoded data as subscriptions and GraphQL query

# Prerequisite
- [Uniswap Universal Publisher](https://github.com/HiroyukiNaito/uniswap-universal-publisher): The GraphQL receive data from the Uniswap Universal Publisher through mutations
- Mongo DB: Mutations register data to the Mongo DB

# Installation and Running

##  1. Install Node Js

```bash
$ sudo apt install nodejs
```

## 2. Install uniswap-universal-graphql

```bash
$ cd ./[application execute path]
$ git clone https://github.com/HiroyukiNaito/uniswap-universal-graphql.git
$ cd uniswap-universal-graphql
$ yarn install 
```

## 3. Set environmental valuables of uniswap-universal-graphql

```bash
$ vi .env
```
```bash
# Your Mongo DB server (DNS name or IP address)
MONGODB_SERVER=localhost

# Database which store Uniswap universal router data
MONGODB_DB=uniswapData

# Your Mongo DB user name
MONGODB_USER=user

# Your Mongo DB user password
MONGODB_PASSWORD=password
```

## 4. Export environmental valuables
```bash
$ export $(cat .env | xargs)
```

## 5. Run the app
```bash
$ yarn nodemon app
```

## 6. Models and Schemas
|  Model Name                                                                                           | Indeces                                               | Description          |
| ----                                                                                                  | ----                                                  | ----                 |
| [txnPools](https://github.com/HiroyukiNaito/uniswap-universal-graphql/blob/main/model/txnPools.js)    | _id, hash(unique), createdAt (ttl: 2592000)           | Transaction Pool Data. *This data will vanish after a month* |
| [txns](https://github.com/HiroyukiNaito/uniswap-universal-graphql/blob/main/model/txns.js)            | _id, hash(unique), createdAt, blockHeader.timestamp   | L1 Transaction Data  | 
| [l2txns](https://github.com/HiroyukiNaito/uniswap-universal-graphql/blob/main/model/l2txns.js)        | _id, hash(unique), createdAt, blockHeader.timestamp   | L2 Transaction Data  |

- Schemas are *[here](https://github.com/HiroyukiNaito/uniswap-universal-graphql/blob/main/graphQL/schema/index.js)*

## 7. Subscriptions
Can subscribe L1 latest txpool data, L1 transaction data and L2 transaction data

### Subscription example
- Subscribe all properties in the most recent **txpool data**
```graphql
subscription {
  txnPool {
    provider
    blockNumber
    blockHash
    hash
    type
    to
    from
    nonce
    gasLimit
    gasPrice
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
    createdAt
    decodedData {
      contents
      deadline
    }
    accessList
    signature {
      _type
      networkV
      r
      s
      v
    }
  }  
}
```

- Subscribe most properties in the most recent **L1 Transaction data**
```graphql
subscription {
  txn {
    provider
    blockNumber
    blockHash
    hash
    type
    to
    from
    nonce
    gasLimit
    gasPrice
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
    createdAt
    decodedData {
      contents
      deadline
    }
    accessList
    signature {
      _type
      networkV
      r
      s
      v
    }
    blockHeader {
     _type
     baseFeePerGas
     difficulty
     extraData
     gasLimit
     gasUsed
     hash
     miner
     nonce
     number
     parentHash
     timestamp
    }
  }  
}
```

- Subscribe most properties in the most recent **L2 Transaction data**
- Note: L2 Uniswap transaction are significantly fewer than L1
```graphql
subscription {
  l2txn {
    provider
    blockNumber
    blockHash
    hash
    type
    to
    from
    nonce
    gasLimit
    gasPrice
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
    createdAt
    decodedData {
      contents
      deadline
    }
    accessList
    signature {
      _type
      networkV
      r
      s
      v
    }
    blockHeader {
     _type
     baseFeePerGas
     difficulty
     extraData
     gasLimit
     gasUsed
     hash
     miner
     nonce
     number
     parentHash
     timestamp
    }
  }  
}
```

## 8. Query Data
- Can list all obtained L1 txpool data, L1 transaction data and L2 transaction data stored in Mongo DB
- Other useful queries are considered now. Any suggestions are welcomed.

### Query example
- List **all txpool data**
```graphql
query {
  txnPoolList(limit: 100) {
    provider
    blockNumber
    blockHash
    hash
    type
    to
    from
    nonce
    gasLimit
    gasPrice
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
    createdAt
    decodedData {
      contents
      deadline
    }
    accessList
    signature {
      _type
      networkV
      r
      s
      v
    }
  }  
}
```

- List **all L1 transaction data**
```graphql
query {
  txnList(limit: 100) {
    provider
    blockNumber
    blockHash
    hash
    type
    to
    from
    nonce
    gasLimit
    gasPrice
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
    createdAt
    decodedData {
      contents
      deadline
    }
    accessList
    signature {
      _type
      networkV
      r
      s
      v
    }
    blockHeader {
     _type
     baseFeePerGas
     difficulty
     extraData
     gasLimit
     gasUsed
     hash
     miner
     nonce
     number
     parentHash
     timestamp
    }
  }  
}
```

- List **all L2 transaction data**
```graphql
query {
  l2txnList(limit: 100){
    provider
    blockNumber
    blockHash
    hash
    type
    to
    from
    nonce
    gasLimit
    gasPrice
    maxPriorityFeePerGas
    maxFeePerGas
    data
    value
    chainId
    createdAt
    decodedData {
      contents
      deadline
    }
    accessList
    signature {
      _type
      networkV
      r
      s
      v
    }
    blockHeader {
     _type
     baseFeePerGas
     difficulty
     extraData
     gasLimit
     gasUsed
     hash
     miner
     nonce
     number
     parentHash
     timestamp
    }
  }  
}
```
