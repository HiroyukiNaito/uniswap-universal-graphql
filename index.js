const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createYoga, createSchema } = require('graphql-yoga');
const { createServer } = require('node:http');
const pino = require('pino');
const logger = pino({
  level: process.env.PINO_LOG_LEVEL ?? 'info',
  formatters: {
    bindings: (bindings) => ({ pid: bindings.pid, host: bindings.hostname }),
    level: (label) => ({ level: label.toUpperCase()}),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
});
  
//  Loading Schema and Resolver
const typeDefs = require('./graphQL/schema/index');
const resolvers = require('./graphQL/resolver/index');
const schema = createSchema({ typeDefs, resolvers });


// Mongo DB server settings
const mongo_server = process.env.MONGODB_SERVER;
const db = process.env.MONGODB_DB;
const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASSWORD;
const database =`mongodb://${user}:${pass}@${mongo_server}:27017/${db}`;

logger.info(database, 'MongoDB connection string');
mongoose.connect(database)
    .then(() => {
        logger.info('Connection to DB successful');
    })
    .catch(err => {
        logger.error(err, 'DB Connection Error!');
    });

// Create Yoga GraphQL Server
const yoga = createYoga({ schema });
const server = new  createServer(yoga);
server.listen(4000, () => {
     logger.info('Server is running on http://localhost:4000/graphql')
});
