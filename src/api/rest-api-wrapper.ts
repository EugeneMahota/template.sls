import middy, { MiddlewareObj, MiddyfiedHandler } from '@middy/core';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import errorHandler from '@middy/http-error-handler';
import errorLogger from '@middy/error-logger';
import jsonBodyParser from '@middy/http-json-body-parser';
import responseSerializer from '@middy/http-response-serializer';
import { log } from '../helper/logger';
import { MiddyValidatorSchema } from './types';

const logEvent = (_: MiddlewareObj<APIGatewayEvent> = {}): MiddlewareObj<APIGatewayEvent> => {
  return {
    before: (request: middy.Request) => {
      log('EVENT: ', request?.event);
    },
  }
}

export function restApiHandler(handler: Handler, options?: RestApiHandlerOptions): MiddyfiedHandler {
  return middy(handler)
    .use(jsonBodyParser())
    .use(
      validator({
        eventSchema: transpileSchema(bodyEventSchema(options?.bodySchema)),
      })
    )
    .use(logEvent())
    .use(errorLogger())
    .use(errorHandler())
    .use(responseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
        defaultContentType: 'application/json',
      }),
    );
}

function bodyEventSchema(schema: MiddyValidatorSchema) {
  if (schema) {
    return { type: 'object', properties: { body: schema } };
  }
  return baseSchema;
}

interface RestApiHandlerOptions {
  bodySchema: MiddyValidatorSchema;
}

const baseSchema: MiddyValidatorSchema = {
  type: 'object',
  additionalProperties: true,
}
