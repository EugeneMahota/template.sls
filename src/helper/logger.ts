import { inspect } from 'util';
import { getEnv } from './environment';

function wrapLogger<T extends (...args: any[]) => any>(logger: T): T {
  return ((...args: any[]) => {
    /**
     * Don't show the logs in CI for faster testing
     * Sometimes we turn off the logs in production environment for better performance
     */
    if (getEnv('CI', false) === 'true' || getEnv('HIDE_LOGS', false) === 'true') {
      return;
    }

    logger(
      ...args.map((a) => {
        return inspect(a, {
          depth: null,
        });
      })
    );
  }) as T;
}

export const log = wrapLogger(console.log.bind(console));
export const debug = wrapLogger(console.debug.bind(console));
export const info = wrapLogger(console.info.bind(console));
export const error = wrapLogger(console.error.bind(console));
export const warn = wrapLogger(console.warn.bind(console));


export function cloudWatchLogUrl(): string {
  const region: string = getEnv('REGION');
  const logGroupName: string = getEnv('AWS_LAMBDA_LOG_GROUP_NAME');
  const logStreamName: string = getEnv('AWS_LAMBDA_LOG_STREAM_NAME');
  const encodedLogGroupName: string = encodeURIComponent(logGroupName);
  const encodedLogStreamName: string = encodeURIComponent(logStreamName);

  return `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/${encodedLogGroupName}/log-events/${encodedLogStreamName}`;
}
