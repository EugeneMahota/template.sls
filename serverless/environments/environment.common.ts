import { Ref, ResourceName, StateMachineArn } from '../intrinsic-fn';

export const COMMON_ENVS = {
  SERVICE_NAME: 'sls-v4',
  REGION: 'us-east-1',
  PROFILE: 'eugene',
  IS_OFFLINE: false,

  /** esbuild */
  ESB_MINIFY: false,
  ESB_SOURCEMAP: true,

  /** tables */
  LOGS_TABLE: ResourceName('logs'),
  LOGS_TABLE_CODE_INDEX: ResourceName('logs-code-index'),

  /** step functions */
  DELAYED_EXECUTION_STATEMACHINE: ResourceName('delayed-execution'),
  DELAYED_EXECUTION_STATEMACHINE_ARN: StateMachineArn('DELAYED_EXECUTION_STATEMACHINE'),

  /** sqs */
  QUEUE_EXAMPLE_NAME: ResourceName('queue-example'),
  QUEUE_EXAMPLE_NAME_DLQ: ResourceName('queue-example-dlq'),
  QUEUE_EXAMPLE_URL: Ref('QueueExample'),
};
