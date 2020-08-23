const { gql } = require("apollo-server");

module.exports =  gql`
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