# Serverless REST API built on TypeScript, Express, and DynamoDB

This template can be used to scaffold out a basic Serverless REST API.

<!-- - I used apiKeys to secure the endpoints but you can add custom authorizers -->

## Use Cases

- Small REST API backed by DynamoDB

## Setup

<!-- - Setup your env file for AWS deployment with:
  - NODE_ENV -->

- Init local DynamoDB: `npm run dev:init`

## Development

- To run locally: `npm start`
- To debug locally: `npm run start:debug`

<!-- - set `x-api-key` header with key `your-api-key-that-is-at-least-characters-long` -->

## Deployment

- Deploy default stage "dev": `npm run deploy`
- Deploy custom stage: `npm run deploy -- --stage <my-stage>`

## TODO

- Think about authentication using `provider.apiGateway.apikeys` [docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/)
- Authorization
- Add graphql API
