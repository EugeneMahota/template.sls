import { Arn, IndexArn } from '../intrinsic-fn';
import { AWSPartitial } from '../types';

const EventLogsTableName: string = 'EventLogsTable';
export const dynamoTables: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:DeleteItem',
              'dynamodb:UpdateItem',
              'dynamodb:BatchGetItem',
              'dynamodb:BatchWriteItem',
            ],
            Resource: [
              Arn(EventLogsTableName),
              IndexArn('LOGS_TABLE', 'LOGS_TABLE_CODE_INDEX'),
            ],
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      [EventLogsTableName]: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
          TableName: '${param:LOGS_TABLE}',
          BillingMode: 'PAY_PER_REQUEST',
          AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
            { AttributeName: 'eventCode', AttributeType: 'S' },
          ],
          KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' },
            { AttributeName: 'eventCode', KeyType: 'RANGE' },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: '${param:LOGS_TABLE_CODE_INDEX}',
              KeySchema: [
                { AttributeName: 'eventCode', KeyType: 'HASH' },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
            },
          ],
        },
      },
    },
  },
};
