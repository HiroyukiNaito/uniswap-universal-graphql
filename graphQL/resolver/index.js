const getlistResolver = require("./queryResolver");
const createResolver = require("./mutationResolver");
const subscriptionResolver = require("./subscription");
const rootResolver = {
  ...createResolver,
  ...getlistResolver,
  ...subscriptionResolver,
};
module.exports = rootResolver;
