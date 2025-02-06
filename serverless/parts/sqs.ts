import { Arn } from '../intrinsic-fn';
import { AWSPartitial } from '../types';

export const sqs: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['sqs:*'],
            Resource: [
              Arn('QueueExample'),
              Arn('QueueExampleDLQ')
            ],
          },
        ],
      },
    },
  },
  functions: {
    addItemInQueue: {
      handler: 'src/api/sqs/handler.addItemInQueue',
      memorySize: 128,
      timeout: 29,
      events: [
        {
          http: {
            method: 'post',
            path: '/api/add-queue-item',
            cors: true,
          }
        },
      ],
    },
    handleQueueItem: {
      handler: 'src/api/sqs/handler.handleQueueItem',
      memorySize: 128,
      timeout: 900,
      events: [
        {
          sqs: {
            arn: Arn('QueueExample'),
            batchSize: 1,
          },
        },
      ]
    },
  },
  resources: {
    Resources: {
      QueueExample: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${param:QUEUE_EXAMPLE_NAME}',
          MessageRetentionPeriod: 1209600,
          VisibilityTimeout: 900,
          RedrivePolicy: {
            deadLetterTargetArn: Arn('QueueExampleDLQ'),
            maxReceiveCount: 2,
          },
        },
      },
      QueueExampleDLQ: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${param:QUEUE_EXAMPLE_NAME_DLQ}',
          MessageRetentionPeriod: 1209600,
        },
      },
    },
  },
};
