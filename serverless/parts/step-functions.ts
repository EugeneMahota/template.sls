import { FunctionArn } from '../intrinsic-fn';
import { AWSPartitial } from '../types';

const delayedFunctionHandler: string = 'delayedFunctionHandler';

export const stepFunctions: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['states:StartExecution'],
            Resource: [
              '${param:DELAYED_EXECUTION_STATEMACHINE_ARN}',
            ],
          },
        ],
      },
    },
  },
  functions: {
    scheduleDelayedFunction: {
      handler: 'src/api/step-functions/handler.scheduleDelayedFunction',
      memorySize: 128,
      timeout: 29,
      events: [
        {
          http: {
            method: 'post',
            path: '/api/schedule-delayed-function',
            cors: true,
          }
        },
      ],
    },
    [delayedFunctionHandler]: {
      handler: 'src/api/step-functions/handler.delayedFunctionHandler',
      memorySize: 128,
      timeout: 900,
    },
  },
  stepFunctions: {
    stateMachines: {
      delayedExecutionStateMachine: {
        name: '${param:DELAYED_EXECUTION_STATEMACHINE}',
        definition: {
          StartAt: 'waitForExecution',
          States: {
            waitForExecution: {
              Type: 'Wait',
              TimestampPath: '$.scheduledTime',
              Next: 'executeFunction',
            },
            executeFunction: {
              Type: 'Task',
              Resource: FunctionArn(delayedFunctionHandler),
              End: true,
            },
          },
        },
      },
    },
    validate: true,
  },
};
