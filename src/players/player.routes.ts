import { Router } from 'express';
import { wrapAsync } from '../lib/wrap-async';
import * as playerController from './player.controller';

const hex = '[0-9A-Fa-f]';
const uuidV4Regex = `${hex}{8}-${hex}{4}-4${hex}{3}-[89AB]${hex}{3}-${hex}{12}`;

export const router = Router();
router.get(
  `/:id(${uuidV4Regex})`,
  wrapAsync(async ({ params: { id } }, res) => {
    return res.json(await playerController.get(id));
  })
);

router.get(
  '/',
  wrapAsync(async ({ query }, res) => {
    return res.json(await playerController.getAll(query));
  })
);

router.post(
  '/',
  wrapAsync(async ({ body: player }, res) => {
    return res.json(await playerController.create(player));
  })
);

router.put(
  `/:id(${uuidV4Regex})`,
  wrapAsync(async ({ params: { id }, body: player }, res) => {
    if (player.id && player.id !== id) {
      throw new Error(`The id cannot be modified`);
    }

    // Let dynamoose handle these props
    delete player.createdAt;
    delete player.updatedAt;

    return res.json(await playerController.update({ ...player, id }));
  })
);

router.delete(
  `/:id(${uuidV4Regex})`,
  wrapAsync(async ({ params: { id } }, res) => {
    await playerController.deleteOne(id);
    return res.end();
  })
);
