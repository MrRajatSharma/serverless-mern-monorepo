
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

module.exports =  {
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