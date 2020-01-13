'use strict';

const { graphql } = require('graphql');
const schema = require('./schema');
// const create = require('./resolvers/create');
// const list = require('./resolvers/list');
// const remove = require('./resolvers/remove');
// const view = require('./resolvers/view');
// const { ApolloServer, gql } = require('apollo-server-lambda');

// const typeDefs = schema;

// const resolvers = {
//   Query: {
//     view,
//     list
//   },
//   Mutation: {
//     create,
//     remove
//   }
// };

// const server = new ApolloServer({ typeDefs, resolvers });
// exports.graphqlHandler = server.createHandler({
//   cors: {
//     origin: true,
//     credentials: true,
//   },
// });

module.exports.query = (event, context, callback) => {
  graphql(schema, event.body)
    .then(result => callback(null, { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, }, body: JSON.stringify(result) }))
    .catch(callback);
}