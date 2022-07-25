import { isAuthenticated } from '../../util/permissionHelpers';
import { ResolverContext } from '../resolvers';
import { PlayerModel } from './player.entity';

interface PlayerInput {
  teamName: string;
  name: string;
  description?: string;
  tags?: TagInput[];
}

interface UpdatePlayerInput extends PlayerInput {
  id: string;
}

interface TagInput {
  name: string;
}

export const permissions = {
  Query: {
    players: isAuthenticated,
  },
  Mutation: {
    createPlayer: isAuthenticated,
    deletePlayer: isAuthenticated,
  },
};

const Query = {
  players: (_: null, args: { teamName: string }, context: ResolverContext) => {
    const { db } = context;
    return db.players.getAll({
      teamName: args.teamName,
    });
  },
};

const Mutation = {
  createPlayer: (
    _: null,
    { player }: { player: PlayerInput },
    context: ResolverContext
  ) => {
    const { db } = context;
    return db.players.create(new PlayerModel(player));
  },
  updatePlayer: (
    _: null,
    { player }: { player: UpdatePlayerInput },
    context: ResolverContext
  ) => {
    const { db } = context;
    return db.players.update(new PlayerModel(player));
  },
  deletePlayer: async (
    _: null,
    { id }: { id: string },
    context: ResolverContext
  ) => {
    const { db } = context;
    await db.players.deleteById(id);
  },
};

const Player = {};

export default { Mutation, Query, Player };
