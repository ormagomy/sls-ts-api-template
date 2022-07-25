import cors from 'cors';
import { aws } from 'dynamoose';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import serverless from 'serverless-http';
import { handleKnownErrors, uncaughtErrorHandler } from './middleware/error';
import { playground } from './middleware/graphql-playground';
import { errorLogger } from './middleware/logging/error.logger';
import { requestLogger } from './middleware/logging/request.logger';
import { restAuthorization } from './middleware/rest-authorization';
import { schema } from './schema';
import * as playerRepository from './schema/players/player.repository';
import { router as playerRouter } from './schema/players/player.routes';
import expressJWT from 'express-jwt';

// Dynamoose config
aws.sdk.config.update({
  region: process.env.AWS_REGION,
});
if (process.env.NODE_ENV === 'LOCAL') {
  aws.ddb.local(`http://localhost:${process.env.DYNAMODB_LOCAL_PORT}`);
}

const app = express();

// Body parsers
const jsonParser = express.json();

// This is a liberal use of cors, we may want to limit even further
app.use(cors());
// Log all requests before passing to route middleware
app.use(requestLogger);

/*
 * REST routes
 *
 * Note that order of middlewares is important here since we're using the json parser to translate application/json to
 * be accessible off body in the authZ middleware.
 */
app.use('/v1/players', jsonParser, restAuthorization, playerRouter);

/**
 * GraphQL route handler
 */
app.use(
  '/gql',
  expressJWT({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
    // This allows for unauthenticatd access, but permissions are verified by the shield on a per-resolver basis.
    credentialsRequired: false,
  }),
  jsonParser,
  graphqlHTTP((req) => ({
    schema,
    graphiql: false,
    context: {
      // @ts-ignore
      user: req.user || null,
      db: {
        players: playerRepository,
      },
    },
  }))
);

// Use the graphql playground at /graphiql
app.use('/graphiql', playground);

// Handle errors gracefully
app.use(handleKnownErrors);

// Handle uncaught errors
app.use(errorLogger);
app.use(uncaughtErrorHandler);

/*
 Wrap the application in the serverless http translator. This makes it so that a lambda event is turned into an express
 request object for interfacing with express for routing.
 */
export const handler = serverless(app);
