import { mergeResolvers } from '@graphql-tools/merge';
import { VoidResolver } from 'graphql-scalars';
import { shield } from 'graphql-shield';
import { merge } from 'lodash';
import authResolvers, {
  AuthUser,
  permissions as authPermissions,
} from './auth/auth.resolvers';
import * as playerRepository from './players/player.repository';
import playersResolvers, {
  permissions as playerPermissions,
} from './players/player.resolvers';

export interface ResolverContext {
  db: {
    players: typeof playerRepository;
  };
  user: AuthUser;
}

const scalarResolvers = {
  Void: VoidResolver,
};

export const resolvers = mergeResolvers([
  scalarResolvers,
  authResolvers,
  playersResolvers,
]);

export const permissions = shield(merge(authPermissions, playerPermissions));
