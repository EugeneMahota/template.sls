import { restErrorHandler } from '../../helper/error-handler/error-handler';
import { log } from '../../helper/logger';
import { EventLogCode, LogsModel } from '../../models/logs.model';
import { LambdaEvent } from '../types';

export const testFunction = async (event: LambdaEvent<{}, {}, {}, {}>): Promise<any> => {
  try {
    log('testFunction: ', event.body);

    await LogsModel.create({ eventCode: EventLogCode.CREATE });
    return await LogsModel.query({ eventCode: EventLogCode.CREATE }).exec();
  } catch (error) {
    return restErrorHandler(error);
  }
}
