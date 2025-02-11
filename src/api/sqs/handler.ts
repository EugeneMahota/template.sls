import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { MiddyfiedHandler } from '@middy/core';
import { SQSEvent } from 'aws-lambda';
import { getEnv } from '../../helper/environment';
import { log } from '../../helper/logger';
import { restApiHandler } from '../rest-api-wrapper';
import { LambdaEvent, MiddyValidatorSchema } from '../types';

const queueItemSchema: MiddyValidatorSchema = {
  type: 'object',
  properties: {
    job: { type: 'string' },
  },
  required: ['job'],
};

export const addItemInQueue: MiddyfiedHandler<LambdaEvent<{ job: string; }, {}, {}, {}>> = restApiHandler(
  async ({ body }): Promise<{ message: string }> => {
    const client: SQSClient = new SQSClient();
    await client.send(new SendMessageCommand({
      MessageBody: JSON.stringify(body),
      QueueUrl: getEnv('QUEUE_EXAMPLE_URL'),
      DelaySeconds: 10,
    }));
    return { message: 'All fine:)' };
  },
  { bodySchema: queueItemSchema },
);

export const handleQueueItem = async (event: SQSEvent) => {
  try {
    log('EVENT: ', event);

  } catch (error) {
    log.error(error);
  }
};


export const handleFailedQueueItem = async (event: SQSEvent) => {
  try {
    log('EVENT: ', event);

  } catch (error) {
    log.error(error);
  }
}
