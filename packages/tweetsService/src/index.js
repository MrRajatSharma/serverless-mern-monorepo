const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

// demo data
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
  }
`;

const resolvers = {
  Query: {
    first() {
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

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

// uncomment below to run as node env instead of serverless
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// exports.handler = server.createHandler({
//   cors: {
//     origin: '*',
//   },
// });