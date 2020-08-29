// Dynamodb data mapper reference: https://awslabs.github.io/dynamodb-data-mapper-js/packages/dynamodb-data-mapper/

const { ApolloServer, gql } = require("apollo-server-lambda");
// const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

import Tweets from './tweets';
import {DataMapper} from '@aws/dynamodb-data-mapper';
import DynamoDB from 'aws-sdk/clients/dynamodb';

const client = new DynamoDB({region: 'us-east-1', endpoint: "http://localhost:8000"});
const mapper = new DataMapper({client});

const getTweet = async (id) => {
  const toFetch = new Tweets();
  toFetch.id = id;
  const fetched = await mapper.get({item: toFetch})
  return fetched;
}

const getTweetByPage = async (lastEvaluatedKey) => {
  const paginator = mapper.scan(
    Tweets,
    {
        // automatically stop after 25 items or the entire result set has been
        // fetched, whichever is smaller
        startKey: lastEvaluatedKey || null,
        limit: 10
    }
  ).pages();

  let list;
  for await (const page of paginator) {
    list = page;
  }

  console.log(list);

  // paginator.count,
  // paginator.scannedCount,
  // paginator.lastEvaluatedKey
  // console.log("Paginator", paginator);
  return {
    count: paginator.count,
    scannedCount: paginator.scannedCount,
    lastEvaluatedKey: JSON.stringify(paginator.lastEvaluatedKey),
    list
  };

}

const resolvers = {
  Query: {
    async list(root, {lastEvaluatedKey}) {
      console.log("list called with lastEvaluatedKey:", lastEvaluatedKey);
      return await getTweetByPage(lastEvaluatedKey && JSON.parse(lastEvaluatedKey));
    },
  },
  Tweet: {
    async __resolveReference(object) {
      
      return tweets.find(tweet => tweet.id === object.id);
    }
  }
};

const typeDefs = gql`
type Mutation {
  createTweet(
    title: String!,
    user: String!,
    body: String!
  ): Tweet!
}
type Query {
  list(lastEvaluatedKey: String): TweetList!
}
type TweetList {
  count: Int!,
  scannedCount: Int!,
  list: [Tweet!]!,
  lastEvaluatedKey: String!
}
type Tweet @key(fields: "id") {
  id: ID!
  user: String
  title: String
  createdAt: String
}

schema {
  query: Query
  mutation: Mutation
}`;

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

// export const handler = server.createHandler();

// uncomment below to run as node env instead of serverless
// server.listen({ port: 4001 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
    methods: 'GET, POST',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
});