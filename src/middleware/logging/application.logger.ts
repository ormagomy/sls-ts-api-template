import winston from 'winston';

const { LOGGING_LEVEL = 'silly' } = process.env;

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      /*
            This level can be one of the following five levels, read more about
            supported levels here: https://github.com/winstonjs/winston#querying-logs
            {
              error: 0,
              warn: 1,
              info: 2,
              verbose: 3,
              debug: 4,
              silly: 5
            }
             */
      level: LOGGING_LEVEL,
    }),
  ],
  exitOnError: false,
});
