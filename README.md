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
|  Model Name  | indeces  | Description |
| ----         | ----     | ---- |
|  txnPools    | _id, hash(unique), createdAt, | Transaction Pool Data|
|  txns        | _id, hash(unique), createdAt, blockHeader.timestamp | L1 Transaction Data  | 
| l2txn        | _id, hash(unique), createdAt, blockHeader.timestamp   | L2 Transaction Data  |
