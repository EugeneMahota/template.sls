const COMMON_ENVS = {
  STAGE: 'dev',
  TEST_ENV: '1234',
  BOOLEAN_ENV: true,
};

const DEV_ENVS = {
  STAGE: 'dev',
};
const TEST_ENVS = {
  STAGE: 'test',
};
const PROD_ENVS = {
  STAGE: 'prod',
};

export function getStagesEnvs() {
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
      params: PROD_ENVS,
    },
  };
}

export function getEnvs() {
  const allEnvKeys: string[] = Array.from(new Set([
    ...Object.keys(COMMON_ENVS),
    ...Object.keys(DEV_ENVS),
    ...Object.keys(TEST_ENVS),
    ...Object.keys(PROD_ENVS),
  ]));
  return Object.fromEntries(allEnvKeys.map((key: string) => [key, '${param:' + key +'}']));
}
