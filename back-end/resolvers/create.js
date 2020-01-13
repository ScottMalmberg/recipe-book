'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (data) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v4(),
            createdAt: Date.now(),
            title: data.title,
            ingredients: data.ingredients,
            instructions: data.instructions,
        }
    };
    return dynamoDb.put(params).promise()
        .then(result => params.Item)
};