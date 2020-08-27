const {
  DynamoDbSchema,
  DynamoDbTable,
} = require('@aws/dynamodb-data-mapper');
const v4 = require('uuid/v4');

class Tweets {
  // Declare methods and properties as usual
  // id: ;
  // createdAt;
  // user;
  // title;
}
Object.defineProperties(Tweets.prototype, {
  [DynamoDbTable]: {
      value: 'Tweets'
  },
  [DynamoDbSchema]: {
      value: {
          id: {
              type: 'String',
              keyType: 'HASH',
              defaultProvider: v4,
          },
          createdAt: {
              type: 'Date',
              keyType: 'RANGE'
          },
          user: {type: 'String'},
          title: {type: 'String'},
      },
  },
});
export default Tweets;
