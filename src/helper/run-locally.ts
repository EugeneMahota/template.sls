import { Handler } from 'aws-lambda';
import { log } from './logger';

export async function runLocally(handler: Handler, { body, headers, path, query }: {
  body?: any;
  headers?: any;
  path?: any;
  query?: any
}): Promise<void> {
  try {
    const context = {
      getRemainingTimeInMillis: () => 30_000,
      functionName: 'local',
      awsRequestId: 'local',
      callbackWaitsForEmptyEventLoop: false,
      functionVersion: null,
      invokedFunctionArn: null,
      memoryLimitInMB: null,
      logGroupName: null,
      logStreamName: null,
      done: null,
      fail: null,
      succeed: null,
    };
    const response = await handler(
      {
        headers: { 'Content-Type': 'application/json', ...(headers ?? {}), },
        body: JSON.stringify(body ?? {}),
        path,
        query,
      },
      context,
      null,
    )
    log('RESPONSE: ', response);
  } catch (error) {
    log('ERROR: ', error);
  }
}
