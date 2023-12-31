const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { createYoga, createSchema } = require("graphql-yoga");
const {
  useDisableIntrospection,
} = require("@graphql-yoga/plugin-disable-introspection");
const { createServer } = require("node:http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const pino = require("pino");
const logger = pino({
  level: process.env.PINO_LOG_LEVEL ?? "info",
  formatters: {
    bindings: (bindings) => ({ pid: bindings.pid, host: bindings.hostname }),
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

//  Loading Schema and Resolver
const typeDefs = require("./graphQL/schema/index");
const resolvers = require("./graphQL/resolver/index");
const schema = createSchema({ typeDefs, resolvers });

// Mongo DB server settings
const mongo_server = process.env.MONGODB_SERVER;
const db = process.env.MONGODB_DB;
const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASSWORD;
const database = `mongodb://${user}:${pass}@${mongo_server}:27017/${db}`;

const useGraphiql = (process.env.GRAPHIQL ?? false).trim() === "ON" ? true : false;

logger.info(database, "MongoDB connection string");
mongoose
  .connect(database)
  .then(() => {
    logger.info("Connection to DB successful");
  })
  .catch((err) => {
    logger.error(err, "DB Connection Error!");
  });

const yogaSettings = useGraphiql
  ? { schema, graphiql: { subscriptionsProtocol: "WS" } }
  : {
      schema,
      graphiql: false,
      plugins: [useDisableIntrospection()],
    };

const yoga = createYoga(yogaSettings);
const httpServer = new createServer(yoga);

// Create WebSocket server instance from our Node server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
});

// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      return errors.length ? errors : args;
    },
  },
  wsServer
);

httpServer.listen(4000, () => {
  logger.info("Server is running on http://localhost:4000/graphql");
});
