import { Arn } from '../intrinsic-fn';
import { AWSPartitial } from '../types';

const deferredCallHandler: string = 'deferredCallHandler';
const deferredCallStatemachine: string = 'deferredCall';

export const stepFunctions: AWSPartitial = {
  functions: {
    [deferredCallHandler]: {
      handler: 'src/api/step-functions/handler.stepHandler',
      memorySize: 128,
      timeout: 900,
    },
  },
  stepFunctions: {
    stateMachines: {
      [deferredCallStatemachine]: {
        name: '${param:DEFERRED_CALL_STATEMACHINE}',
        definition: {
          StartAt: 'waitFunction',
          States: {
            waitFunction: {
              Type: 'Wait',
              TimestampPath: '$.waitUntilDate',
              Next: 'callFunction',
            },
            callFunction: {
              Type: 'Task',
              Resource: Arn(deferredCallHandler),
              End: true,
            },
          },
        },
      },
    },
    validate: true,
  },
  // resources: {
  //   Resources: {
  //     CallStepFunctionsIamRole: {
  //       Type: 'AWS::IAM::Role',
  //       Properties: {
  //         AssumeRolePolicyDocument: {
  //           Version: '2012-10-17',
  //           Statement: [
  //             {
  //               Effect: 'Allow',
  //               Principal: {
  //                 Service: ['lambda.amazonaws.com'],
  //               },
  //               Action: ['sts:AssumeRole'],
  //             },
  //           ],
  //         },
  //         Policies: [
  //           {
  //             PolicyName: ResourceName('call-step-functions'),
  //             PolicyDocument: {
  //               Version: '2012-10-17',
  //               Statement: [
  //                 {
  //                   Effect: 'Allow',
  //                   Action: [
  //                     'logs:CreateLogGroup',
  //                     'logs:CreateLogStream',
  //                     'logs:PutLogEvents',
  //                   ],
  //                   Resource: [
  //                     Arn(deferredCallStatemachine),
  //                   ],
  //                 },
  //               ],
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   }
  // },
};
