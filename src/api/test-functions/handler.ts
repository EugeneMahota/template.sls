import { MiddyfiedHandler } from '@middy/core';
import { Handler } from 'aws-lambda';
import { BadRequest } from 'http-errors';
import { restApiHandler } from '../rest-api-wrapper';
import { LambdaEvent } from '../types';

type TestFuncBody = { isShowError: boolean };
type TestFuncResponse = { message: string };

const testFunctionHandler: Handler = async ({ body }): Promise<TestFuncResponse> => {
  if (body.isShowError) {
    throw BadRequest(JSON.stringify({ message: 'Something went wrong!' }));
  }
  return { message: 'All good:)' };
};

export const testFunction: MiddyfiedHandler<LambdaEvent<TestFuncBody, {}, {}, {}>> = restApiHandler(testFunctionHandler);

// if (require.main === module) {
//   const context = {
//     getRemainingTimeInMillis: () => 30_000,
//     functionName: 'local',
//     awsRequestId: 'local',
//     callbackWaitsForEmptyEventLoop: false,
//   };
//   testFunction({
//     headers: { 'Content-Type': 'application/json' },
//     // @ts-ignore
//     body: JSON.stringify({ isShowError: false }),
//   }, context, null)
//     .then((v) => console.log('RESPONSE: ', v));
// }
