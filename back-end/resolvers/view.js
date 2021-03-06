'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (id) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { id }
    };
    return dynamoDb.get(params).promise()
        .then(result => result.Item);
};