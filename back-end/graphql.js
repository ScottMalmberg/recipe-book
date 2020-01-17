const { ApolloServer, gql } = require('apollo-server-lambda');
const createRecipe = require('./resolvers/create');
const viewRecipe = require('./resolvers/view');
const listRecipes = require('./resolvers/list');
const removeRecipe = require('./resolvers/remove');
const updateRecipe = require('./resolvers/update');


const typeDefs = gql`
    type Recipe {
        id: String!
        createdAt: String!
        title: String!
        ingredients: String!
        instructions: String!
    }

    type Query {
        recipe(id: String!): Recipe
        recipes: [Recipe]
    }

    type Mutation {
        addRecipe(title: String!, ingredients: String!, instructions: String!): Recipe
        deleteRecipe(id: String!): String
        updateRecipe(id: String!, title: String, ingredients: String, instructions: String): Recipe
    }
`;

const resolvers = {
    Query: {
        recipe: (parent, args) => viewRecipe(args.id),
        recipes: (parent, args) => listRecipes()
    },
    Mutation: {
        addRecipe: (parent, args) => createRecipe(args),
        deleteRecipe: (parent, args) => removeRecipe(args.id),
        updateRecipe: (parent, args) => updateRecipe(args)
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
    }),
});

exports.graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization'
    },
});