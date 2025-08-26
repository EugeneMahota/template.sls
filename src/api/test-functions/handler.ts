import { MiddyfiedHandler } from '@middy/core';
import { BadRequest } from 'http-errors';
import { runLocally } from '../../helper/run-locally';
import { restApiHandler } from '../rest-api-wrapper';
import { LambdaEvent } from '../types';

type TestFuncBody = { isShowError: boolean };
type TestFuncResponse = { message: string };

export const testFunction: MiddyfiedHandler<LambdaEvent<TestFuncBody, {}, {}, {}>> = restApiHandler(async ({ body }): Promise<TestFuncResponse> => {
  if (body.isShowError) {
    throw BadRequest(JSON.stringify({
      message: 'Something went wrong!',
    }));
  }
  return { message: 'All good:)' };
});

if (require.main === module) {
  runLocally(testFunction, { body: { isShowError: false } }).then();
}
