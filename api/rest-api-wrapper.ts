import middy, { MiddyfiedHandler } from '@middy/core';
import { Handler } from 'aws-lambda';
import errorHandler from '@middy/http-error-handler';
import errorLogger from '@middy/error-logger';
import jsonBodyParser from '@middy/http-json-body-parser';
import responseSerializer from '@middy/http-response-serializer';

export function restApiHandler(handler: Handler): MiddyfiedHandler {
  return middy(handler)
    .use(jsonBodyParser())
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
    )
}

