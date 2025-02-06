import { MiddyfiedHandler } from '@middy/core';
import { getEnv } from '../../helper/environment';
import { log } from '../../helper/logger';
import { StartExecutionCommand, SFNClient } from '@aws-sdk/client-sfn';
import { restApiHandler } from '../rest-api-wrapper';
import { LambdaEvent } from '../types';

export const scheduleDelayedFunction: MiddyfiedHandler = restApiHandler(
  async (event: LambdaEvent<{}, {}, {}, {}>): Promise<{ message: string }> => {
    log('callDeferredFunction: ', event);
    const utcDateAfter3Minutes: string = new Date(Date.now() + 1000 * 60 * 3).toISOString();
    const client = new SFNClient();
    const inputData = JSON.stringify({
      scheduledTime: utcDateAfter3Minutes,
      answer: 42, /** just additional param */
    });

    await client.send(new StartExecutionCommand({
      stateMachineArn: getEnv('DELAYED_EXECUTION_STATEMACHINE_ARN'),
      input: inputData,
    }));

    return { message: 'All fine :)' };
  },
);

export const delayedFunctionHandler = async (event) => {
  log('delayedFunctionHandler: ', event);
}
