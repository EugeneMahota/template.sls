import { AWSPartitial } from '../types';

export const lambdaFunctions: AWSPartitial = {
  functions: {
    testFunction: {
      handler: 'api/test-function/handler.testFunction',
      memorySize: 256,
      events: [
        {
          http: {
            method: 'post',
            path: '/api/test-function',
            integration: 'lambda',
            cors: true,
          }
        },
      ],
    },
  },
}
