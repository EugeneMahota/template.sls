import type { Serverless } from 'serverless/aws'
import { buildEnvs, buildStages } from './environments/env-builder';
import { lambdaFunctions } from './serverless/parts/functions';
import { permissions } from './serverless/parts/permissions';
import { dynamoTables } from './serverless/parts/tables';
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
    profile: '${param:AWS_PROFILE}',
    stage: '${opt:stage, "dev"}',
    environment: buildEnvs(),
  },
  build: {
    esbuild: {
      bundle: true, // bundling the function code and dependencies into a single file. (Default: true)
      minify: true // minifying the built code. (Default: false),
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
  dynamoTables,
]);
