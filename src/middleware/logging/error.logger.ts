import winston from 'winston';
import expressWinston from 'express-winston';
import { createJsonMasker } from '../../util/mask-json-fields';

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json({ replacer: createJsonMasker })
  ),
});
