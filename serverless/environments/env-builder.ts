import { COMMON_ENVS } from './environment.common';
import { DEV_ENVS } from './environment.dev';
import { PROD_ENVS } from './environment.prod';
import { TEST_ENVS } from './environment.test';

export function buildStages() {
  return {
    default: {
      params: COMMON_ENVS,
    },
    dev: {
      params: DEV_ENVS,
    },
    test: {
      params: TEST_ENVS,
    },
    prod: {
      // observability: true,
      params: PROD_ENVS,
    },
  };
}

export function buildEnvs() {
  const allEnvKeys: string[] = Array.from(new Set([
    ...Object.keys(COMMON_ENVS),
    ...Object.keys(DEV_ENVS),
    ...Object.keys(TEST_ENVS),
    ...Object.keys(PROD_ENVS),
  ]));
  return Object.fromEntries(allEnvKeys.map((key: string) => [key, '${param:' + key +'}']));
}
