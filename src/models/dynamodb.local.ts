import { fromIni } from '@aws-sdk/credential-providers';
import * as dynamoose from 'dynamoose';
import { getEnv } from '../helper/environment';
import { log } from '../helper/logger';

export function dynamodbLocalConnection(): void {
  if (getEnv('IS_OFFLINE') === 'true') {
    try {

      const credentials = fromIni({ profile: getEnv('PROFILE') });
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
