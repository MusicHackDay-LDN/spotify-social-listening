import * as AWS from "aws-sdk";

const TABLE_NAME = "SSL-Parties";

export const createParty = party => {
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-10-08"
  });

  const params = {
    TableName: TABLE_NAME,
    Item: party
  };

  return dynamodb.put(params).promise();
};
