import * as AWS from "aws-sdk";
import { Track } from "./spotify/recommendation";

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

export const updateActiveTrack = async (code: number, track: {}) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-10-08"
  });

  const { Item: party } = await getParty(code);

  const history = [
    ...party.history,
    {
      ...party.activeTrack,
      upvotes: party.currentUpvotes,
      downvotes: party.currentDownvotes
    }
  ];

  var params = {
    TableName: TABLE_NAME,
    Key: { code },
    UpdateExpression: `
      set activeTrack = :track,
          history = :history,
          currentUpvotes = :zero,
          currentDownvotes = :zero
    `,
    ExpressionAttributeValues: {
      ":track": track,
      ":history": history,
      ":zero": 0,
    }
  };

  return dynamodb.update(params).promise();
};
