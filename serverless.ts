import type { Serverless } from 'serverless/aws'
import { buildEnvs, buildStages } from './serverless/environments/env-builder';
import { lambdaFunctions } from './serverless/parts/functions';
import { permissions } from './serverless/parts/permissions';
import { joinParts } from './serverless/utils';

const mainConfig: Serverless = {
  service: '${param:SERVICE_NAME}',
  frameworkVersion: '4.5.2',
  /** I don't know, but... */
  // @ts-ignore
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
      exclude: ['aws-sdk', '@aws-sdk/credential-providers'],
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
    'serverless-offline'
  ],
}

module.exports = joinParts(mainConfig, [
  permissions,
  lambdaFunctions,
  // dynamoTables,
]);
