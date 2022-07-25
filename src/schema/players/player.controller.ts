import { PlayerEntity } from './player.entity';
import * as playerRepository from './player.repository';

export const create = async (player: PlayerEntity) => {
  return playerRepository.create(player);
};

export const get = async (id: string) => {
  return playerRepository.get(id);
};

export const update = async (player: PlayerEntity) => {
  return playerRepository.update(player);
};

export const deleteById = async (id: string) => {
  return playerRepository.deleteById(id);
};

export const getAll = async (queryParam: Partial<PlayerEntity>) => {
  return playerRepository.getAll(queryParam);
};
