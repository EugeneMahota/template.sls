import { SharedIniFileCredentials } from 'aws-sdk';
import * as dynamoose from 'dynamoose';
import { getEnv } from '../helper/environment';
import { log } from '../helper/logger';

export function dynamodbLocalConnection(): void {
  if (getEnv('IS_OFFLINE') === 'true') {
    try {
      const credentials = new SharedIniFileCredentials({ profile: getEnv('AWS_PROFILE') });
      const ddb = new dynamoose.aws.ddb.DynamoDB({
        credentials,
        region: getEnv('REGION'),
      });

      dynamoose.aws.ddb.set(ddb);
    } catch (error) {
      log('dynamodbLocal: ', error);
    }
  }
}
