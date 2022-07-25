import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { permissions, resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const baseSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const schema = applyMiddleware(baseSchema, permissions);
