'use strict';

const { GraphQLSchema, GraphQLNonNull, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLBoolean } = require('graphql');
const createRecipe = require('./resolvers/create');
const viewRecipe = require('./resolvers/view');
const listRecipes = require('./resolvers/list');
const removeRecipe = require('./resolvers/remove');

const recipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        ingredients: { type: new GraphQLNonNull(GraphQLString) },
        instructions: { type: new GraphQLNonNull(GraphQLString) },
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            viewRecipe: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: recipeType,
                resolve: (parent, args) => viewRecipe(args.id)
            },
            listRecipes:  {
                type: new GraphQLList(recipeType),
                resolve: (parent, args) => listRecipes()
            }
        }
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createRecipe: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                    createdAt: { type: new GraphQLNonNull(GraphQLString) },
                    title: { type: new GraphQLNonNull(GraphQLString) },
                    ingredients: { type: new GraphQLNonNull(GraphQLString) },
                    instructions: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: recipeType,
                resolve: (parent, args) => createRecipe(args)
            },
            removeRecipe: {
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: GraphQLBoolean,
                resolve: (parent, args) => removeRecipe(args.id)
            },
        }
    })
});

module.exports = schema;