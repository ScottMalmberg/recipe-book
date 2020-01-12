'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (id) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { id }
    };
    return dynamoDb.delete(params).promise()
        .then(result => id);
};