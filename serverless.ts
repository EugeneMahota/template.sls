import type { Serverless } from 'serverless/aws'
import { getEnvs, getStages } from './environments/env';
import { lambdaFunctions } from './serverless/parts/functions';
import { permissions } from './serverless/parts/permissions';
import { joinParts } from './serverless/utils';

const mainConfig: Serverless = {
  service: '${param:SERVICE_NAME}',
  /** I don't know, but... */
  // @ts-ignore
  stages: getStages(),
  provider: {
    name: 'aws',
    runtime: 'nodejs22.x',
    region: '${param:REGION}',
    profile: '${param:PROFILE}',
    stage: '${opt:stage, "dev"}',
    environment: getEnvs(),
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
  lambdaFunctions,
  permissions,
]);
