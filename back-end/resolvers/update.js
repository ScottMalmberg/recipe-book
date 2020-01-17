'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: data.id
        },
        UpdateExpression: "set title = :t, ingredients = :i, instructions = :in",
        ExpressionAttributeValues: {
            ":t": data.title,
            ":i": data.ingredients,
            ":in": data.instructions
        },
        ReturnValues:"UPDATED_NEW"
    };
    return dynamoDb.update(params).promise()
        .then(result => params.Item)
};