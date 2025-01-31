import * as dynamoose from 'dynamoose';
import { getEnv } from '../helper/environment';
import { log } from '../helper/logger';

export function dynamodbLocalConnection(): void {
  if (getEnv('IS_OFFLINE') === 'true') {
    try {
      const ddb = new dynamoose.aws.ddb.DynamoDB({
        credentials: {
          accessKeyId: getEnv('ACCESS_KEY_ID'),
          secretAccessKey: getEnv('SECRET_KEY_ID'),
        },
        region: getEnv('REGION'),
      });

      dynamoose.aws.ddb.set(ddb);
    } catch (error) {
      log('dynamodbLocal: ', error);
    }
  }
}
