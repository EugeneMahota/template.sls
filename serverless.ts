import type { Serverless } from 'serverless/aws'
import { getEnvs, getStagesEnvs } from './env';

const mainConfig: Serverless = {
  service: 'sls-v4',
  // @ts-ignore
  stages: getStagesEnvs(),
  provider: {
    name: 'aws',
    runtime: 'nodejs22.x',
    region: 'us-east-1',
    profile: 'eugene',
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
