import { APIGatewayEvent } from 'aws-lambda';
import { log } from '../../helper/logger';

export const stepHandler = async (event: APIGatewayEvent) => {
  log('stepHandler: ', event);
}
