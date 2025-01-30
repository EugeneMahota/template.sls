import type { Serverless } from 'serverless/aws'
import { getEnvs, getStages } from './environments/env';

const mainConfig: Serverless = {
  service: 'sls-v4',
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
  useDotenv: true,
  functions: {
    usersCreate: {
      handler: 'handler.createUser',
      events: [
        {
          http: {
            method: 'post',
            path: '/users',
            integration: 'lambda',
            cors: true,
          }
        },
      ],
    },
  },
}

module.exports = mainConfig;
