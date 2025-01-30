import { getEnv } from '../../helper/environment';
import { log } from '../../helper/logger';
import { LambdaEvent } from '../types';

export const testFunction = async (event: LambdaEvent<{}, {}, {}, {}>): Promise<any> => {
  try {
    log('testFunction: ', event);

    return { statusCode: 200, d: getEnv('STAGE') };
  } catch (error) {
    log('testFunction error: ', error);
  }
}
