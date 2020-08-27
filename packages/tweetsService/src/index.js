const { ApolloServer, gql } = require("apollo-server-lambda");
// const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

import Tweets from './tweets';
import {DataMapper} from '@aws/dynamodb-data-mapper';
import DynamoDB from 'aws-sdk/clients/dynamodb';

const client = new DynamoDB({region: 'us-east-1', endpoint: "http://localhost:8000"});
const mapper = new DataMapper({client});


const tweets = [
  {
    id: "1",
    user: "Ada Lovelace",
    title: "Just another tweet",
    created_at: ""
  },
  {
    id: "2",
    user: "Alan Turing",
    title: "What is this happening",
    created_at: ""
  }
];

const resolvers = {
  Query: {
    first() {

      const tweet = new Tweets();
      tweet.createdAt = new Date();
      tweet.user = 'User1';
      tweet.title = 'Hello, DataMapper';

      // const toFetch = new Post();
      // toFetch.id = postId;
      // const fetched = await mapper.get({item: toFetch})
      mapper.put({item: tweet}).then(() => {
          // The tweet has been created!
          console.log(tweet.id);
      });

      return tweets[0];
    },
    listAll() {
      return tweets;
    }
  },
  Tweet: {
    __resolveReference(object) {
      return tweets.find(tweet => tweet.id === object.id);
    }
  }
};

const typeDefs = gql`
extend type Query {
  first: Tweet,
  listAll: [Tweet!]!
}
type Tweet @key(fields: "id") {
  id: ID!
  user: String
  title: String
  created_at: String
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