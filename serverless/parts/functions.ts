import { AWSPartitial } from '../types';

export const lambdaFunctions: AWSPartitial = {
  functions: {
    testFunction: {
      handler: 'src/api/test-function/handler.testFunction',
      memorySize: 256,
      timeout: 29,
      events: [
        {
          http: {
            method: 'post',
            path: '/api/test-function',
            cors: true,
          }
        },
      ],
    },
  },
}
