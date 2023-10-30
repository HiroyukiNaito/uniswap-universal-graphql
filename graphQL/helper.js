const { createPubSub } = require('graphql-yoga');
const pubsub = createPubSub();
module.exports = {
    pubsub
}
