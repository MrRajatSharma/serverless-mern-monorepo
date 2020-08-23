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
    fist: Tweet
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
    }
  },
  Tweet: {
    __resolveReference(object) {
      return tweets.find(tweet => tweet.id === object.id);
    },
    listAll() {
      return tweets;
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

// server.listen({ port: 4001 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

exports.handler = server.createHandler({
  cors: {
    origin: '*',
  },
});