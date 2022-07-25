import { VoidTypeDefinition } from 'graphql-scalars';
import authTypes from './auth/auth.graphql';
import playerTypes from './players/player.graphql';
import globalTypeDefs from './schema.graphql';

export const typeDefs = [
  VoidTypeDefinition,
  globalTypeDefs,
  authTypes,
  playerTypes,
];
