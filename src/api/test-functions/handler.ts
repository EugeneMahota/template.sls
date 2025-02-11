import { MiddyfiedHandler } from '@middy/core';
import * as createHttpError from 'http-errors';
import { restApiHandler } from '../rest-api-wrapper';
import { LambdaEvent } from '../types';
import { testFunctionValidator } from './test-functions.validator';

type TestFuncBody = { isShowError: boolean };
type TestFuncResponse = { message: string };

export const testFunction: MiddyfiedHandler<LambdaEvent<TestFuncBody, {}, {}, {}>> = restApiHandler(
  async ({ body }): Promise<TestFuncResponse> => {

    if (body.isShowError) {
      throw createHttpError.BadRequest('Something went wrong!');
    }

    return { message: 'All good:)' };
  },
  { bodySchema: testFunctionValidator },
);
