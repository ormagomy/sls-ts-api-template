# Serverless API built on TypeScript, Express, and DynamoDB

This template can be used to scaffold out a basic Serverless API.

## Use Cases

- Small REST API backed by DynamoDB

## Setup

- Init local DynamoDB: `npm run dev:init`

## Development

- To run locally: `npm start`
- To debug locally: `npm run start:debug`

## Deployment

- Deploy default stage "dev": `npm run deploy`
- Deploy custom stage: `npm run deploy -- --stage <my-stage>`

## TODO

- Think about authentication using `provider.apiGateway.apikeys` [docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/)
- Authorization
