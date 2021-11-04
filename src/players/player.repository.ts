import { ModelType } from 'dynamoose/dist/General';
import { EntityNotFound } from '../middleware/error';
import { logger } from '../middleware/logging/application.logger';
import { playerDbFactory, PlayerType } from './player.entity';

const playerDb: ModelType<PlayerType> = playerDbFactory({
  tableName: process.env.PLAYERS_TABLE!,
});

/**
 * Check if a player exists with the given id
 */
const exists = async (id: string): Promise<boolean> => {
  const existing = await playerDb.get({ id });
  return Boolean(existing);
};

/**
 * Validates that a player with the given id exists, and throws an error if not.
 *
 * @throws EntityNotFound
 */
const validateExists = async (id: string): Promise<void> => {
  if (!(await exists(id))) {
    logger.error(`Player not found by id = ${id}`);
    throw new EntityNotFound();
  }
};

/**
 * Creates a new player.
 */
export const create = async (player: PlayerType): Promise<PlayerType> => {
  logger.info(`Create new player name = ${player.name}`);
  return playerDb.create(player, { overwrite: false });
};

/**
 * Get a player by id.
 */
export const get = async (id: string): Promise<PlayerType> => {
  logger.info(`Get player by id = ${id}`);
  await validateExists(id);

  return await playerDb.get({ id });
};

/**
 * Updates an existing player. Throws an error if it does not exist.
 */
export const update = async (player: PlayerType): Promise<PlayerType> => {
  logger.info(`Update player by id = ${player.id}`);
  const existingPlayer = await playerDb.get({
    id: player.id,
  });

  // Need to stop right here if we can't find the entity.
  if (!existingPlayer) {
    logger.error(`Player not found by id = ${player.id}`);
    throw new EntityNotFound();
  }

  logger.info(`Found player by id = ${existingPlayer.id}`);
  return playerDb.update(player);
};

/**
 * Deletes a single item by id. Throws an error is it does not exist.
 */
export const deleteById = async (id: string): Promise<void> => {
  await validateExists(id);
  return playerDb.delete({ id });
};

/**
 * Get all players for a team.
 */
export const getAll = async ({
  teamName,
}: Partial<PlayerType>): Promise<PlayerType[]> => {
  if (!teamName) {
    throw new Error('Missing required param: teamName');
  }

  const players = await playerDb
    .query({ teamName })
    // .where('createdAt')
    // .gt(1567799316854)
    // .sort('descending')
    .all()
    .exec();

  return players;
};
