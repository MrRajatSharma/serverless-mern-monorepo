import { ApolloServer } from 'apollo-server-lambda'; // use with serverless
// import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { formatError } from 'apollo-errors';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'tweets', url: 'http://localhost:4001/graphql' },
    // { name: 'users', url: 'http://localhost:4002/graphql' },
  ],
  __exposeQueryPlanExperimental: false,

});

const createHandler = async () => {
  const { schema, executor } = await gateway.load();
  const server = new ApolloServer({
    schema,
    executor,
    formatError,
    introspection: true,
    playground: true,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
  });

  // server.listen(4000).then(({ url }) => {
  //   console.log(`🚀 Server ready at ${url}`);
  // });

  // eslint-disable-next-line no-return-await
  return server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
      methods: 'GET, POST',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export const graphqlHandler = (event, context, callback) => {
  createHandler().then(handler => handler(event, context, callback));
};

// createHandler();
