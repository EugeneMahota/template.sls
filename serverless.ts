import { buildEnvs, buildStages } from './serverless/environments/env-builder';
import { lambdaFunctions } from './serverless/parts/functions';
import { permissions } from './serverless/parts/permissions';
import { sqs } from './serverless/parts/sqs';
import { stepFunctions } from './serverless/parts/step-functions';
import { dynamoTables } from './serverless/parts/tables';
import { CustomServerless } from './serverless/types';
import { joinParts } from './serverless/utils';

const mainConfig: CustomServerless = {
  service: '${param:SERVICE_NAME}',
  frameworkVersion: '4.5.2',
  stages: buildStages(),
  provider: {
    name: 'aws',
    runtime: 'nodejs22.x',
    region: '${param:REGION}',
    profile: '${param:PROFILE}',
    stage: '${opt:stage, "dev"}',
    environment: buildEnvs(),
  },
  package: {
    individually: true,
  },
  build: {
    esbuild: {
      bundle: true,
      minify: '${param:ESB_MINIFY}',
      sourcemap: '${param:ESB_SOURCEMAP}',
      exclude: [
        '@aws-sdk/credential-providers',
        '@aws-sdk/client-sfn',
      ],
      target: 'node22',
      platform: 'node',
      define: {
        'require.resolve': undefined,
      }
    },
  },
  custom: {
    prune: {
      automatic: true,
      number: 3,
    },
    'serverless-offline': {
      ignoreJWTSignature: true,
    },
  },
  plugins: [
    'serverless-prune-plugin',
    'serverless-offline',
    'serverless-step-functions',
  ],
}

module.exports = joinParts(mainConfig, [
  permissions,
  lambdaFunctions,
  dynamoTables,
  stepFunctions,
  sqs,
]);
