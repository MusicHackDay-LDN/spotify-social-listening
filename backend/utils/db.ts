import * as AWS from "aws-sdk";

const TABLE_NAME = "SSL-Parties";

export const createParty = party => {
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-10-08"
  });

  const params = {
    TableName: TABLE_NAME,
    Item: {
      ...party,
      currentUpvotes: 0,
      currentDownvotes: 0
    }
  };

  return dynamodb.put(params).promise();
};

export const getParty = (code: number) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-10-08"
  });

  const params = {
    TableName: TABLE_NAME,
    Key: { code }
  };

  return dynamodb.get(params).promise();
};

export const updateParty = (code: number, key: string, value: any) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-10-08"
  });

  var params = {
    TableName: TABLE_NAME,
    Key: { code },
    UpdateExpression: `set ${key} = :s`,
    ExpressionAttributeValues: {
      ":s": value
    }
  };

  return dynamodb.update(params).promise();
};

const upOrDownvote = (code: number, upvote: boolean) => {
  const key = upvote ? "currentUpvotes" : "currentDownvotes";

  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-10-08"
  });

  var params = {
    TableName: TABLE_NAME,
    Key: { code },
    UpdateExpression: `set ${key} = ${key} + :n`,
    ExpressionAttributeValues: {
      ":n": 1
    }
  };

  return dynamodb.update(params).promise();
};

export const upvoteCurrentPartySong = (code: number) =>
  upOrDownvote(code, true);

export const downvoteCurrentPartySong = (code: number) =>
  upOrDownvote(code, false);
