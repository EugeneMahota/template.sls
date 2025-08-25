import middy, { MiddlewareObj, MiddyfiedHandler } from '@middy/core';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import errorHandler from '@middy/http-error-handler';
import errorLogger from '@middy/error-logger';
import jsonBodyParser from '@middy/http-json-body-parser';
import responseSerializer from '@middy/http-response-serializer';
import { log } from '../helper/logger';

const logEvent = (_: MiddlewareObj<APIGatewayEvent> = {}): MiddlewareObj<APIGatewayEvent> => {
  return {
    before: (request: middy.Request) => {
      log('EVENT: ', request?.event);
      log('BODY: ', request?.event?.body);
    },
  };
};

export function restApiHandler(handler: Handler): MiddyfiedHandler {
  return middy(handler)
    .use(jsonBodyParser())
    .use(logEvent())
    .use(errorLogger())
    .use(errorHandler())
    .use(responseSerializer({
        serializers: [{
          regex: /^application\/json$/,
          serializer: ({ body }) => JSON.stringify(body),
        }],
        defaultContentType: 'application/json',
      }),
    );
}
