import { PlayerType } from './player.entity';
import * as playerRepository from './player.repository';

export const create = async (player: PlayerType) => {
  return playerRepository.create(player);
};

export const get = async (id: string) => {
  return playerRepository.get(id);
};

export const update = async (player: PlayerType) => {
  return playerRepository.update(player);
};

export const deleteById = async (id: string) => {
  return playerRepository.deleteById(id);
};

export const getAll = async (queryParam: Partial<PlayerType>) => {
  return playerRepository.getAll(queryParam);
};
