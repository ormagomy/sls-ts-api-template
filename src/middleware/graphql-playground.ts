import expressPlayground from 'graphql-playground-middleware-express';

export const playground = expressPlayground({
  endpoint: `/${process.env.STAGE}/gql`,
  settings: {
    'schema.polling.enable': false,
  },
});
