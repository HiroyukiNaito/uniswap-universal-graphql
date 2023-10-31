# uniswap-universal-graphql
Store uniswap universal router decoded data to Mongo DB as mutations and distribute decoded data as subscriptions and GraphQL query

# Prerequisite
- [Uniswap Universal Publisher](https://github.com/HiroyukiNaito/uniswap-universal-publisher): The GraphQL receive data from the Uniswap Universal Publisher through mutations
- Mongo DB: Mutations regist data to the Mongo DB

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

## 6. Models
|  Model Name                                                                                           | Indeces                                               | Description          |
| ----                                                                                                  | ----                                                  | ----                 |
| [txnPools](https://github.com/HiroyukiNaito/uniswap-universal-graphql/blob/main/model/txnPools.js)    | _id, hash(unique), createdAt (ttl: 2592000)           | Transaction Pool Data. *This data will vanish after a month* |
| [txns](https://github.com/HiroyukiNaito/uniswap-universal-graphql/blob/main/model/txns.js)            | _id, hash(unique), createdAt, blockHeader.timestamp   | L1 Transaction Data  | 
| [l2txns](https://github.com/HiroyukiNaito/uniswap-universal-graphql/blob/main/model/l2txns.js)        | _id, hash(unique), createdAt, blockHeader.timestamp   | L2 Transaction Data  |

## 7. Subscriptions
Can subscribe L1 latest txpool data, L1 transaction data and L2 transaction data



## 8. Listing Data
Can list L1 latest txpool data, L1 transaction data and L2 transaction data
