import { restErrorHandler } from '../../helper/error-handler/error-handler';
import { log } from '../../helper/logger';
import { LambdaEvent } from '../types';

export const testFunction = async (event: LambdaEvent<{}, {}, {}, {}>): Promise<any> => {
  try {
    log('testFunction: ', event.body);
    return { statusCode: 200, body: event.body };
  } catch (error) {
    return restErrorHandler(error);
  }
}
