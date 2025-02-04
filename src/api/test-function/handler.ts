import { MiddyfiedHandler } from '@middy/core';
import * as createHttpError from 'http-errors';
import { log } from '../../helper/logger';
import { restApiHandler } from '../rest-api-wrapper';
import { LambdaEvent } from '../types';

type TestFuncBody = { isShowError: boolean };

export const testFunction: MiddyfiedHandler<LambdaEvent<TestFuncBody, {}, {}, {}>> = restApiHandler(
  async (event): Promise<any> => {
    log('testFunction: ', event);

    if (event.body.isShowError) {
      throw createHttpError.BadRequest('Something went wrong');
    }

    return { message: 'All good:)' };
  },
)
