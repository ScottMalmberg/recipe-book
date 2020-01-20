'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (data) => dynamoDb.scan({ TableName: process.env.DYNAMODB_TABLE })
    .promise()
    .then(result => 
        {if(data.filter !== '') {
            return result.Items.filter(a => a.title.toLowerCase().includes(data.filter));
        }
        else {
            return result.Items;
        }
    });