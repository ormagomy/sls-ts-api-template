import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';
import { aws } from 'dynamoose';
aws.sdk.config.update({
  region: process.env.AWS_REGION,
});

if (process.env.NODE_ENV === 'LOCAL') {
  aws.ddb.local(`http://localhost:${process.env.DYNAMODB_LOCAL_PORT}`);
}

// Middleware
import { errorLogger } from './middleware/logging/error.logger';
import { requestLogger } from './middleware/logging/request.logger';
import { restAuthorization } from './middleware/rest-authorization';
import { handleKnownErrors, uncaughtErrorHandler } from './middleware/error';

// Routes
import { router as playerRouter } from './players/player.routes';

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
