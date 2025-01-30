import { AWSPartitial } from '../types';

export const permissions: AWSPartitial = {
  provider: {
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['events:*'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['lambda:InvokeAsync', 'lambda:InvokeFunction'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject', 's3:ListBucket'],
            Resource: '*',
          },
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
            Resource: '*',
          },
        ],
      },
    },
  },
};
