export const COMMON_ENVS = {
  SERVICE_NAME: 'sls-v4',
  REGION: 'us-east-1',
  PROFILE: 'eugene',
  IS_OFFLINE: 'false',

  /** tables */
  LOGS_TABLE: '${self:service}-logs-${opt:stage, "dev"}',
  LOGS_TABLE_CODE_INDEX: '${self:service}-logs-code-index-${opt:stage, "dev"}',
};
