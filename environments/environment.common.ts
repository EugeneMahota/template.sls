import { ResourceName } from '../serverless/intrinsic-fn';

export const COMMON_ENVS = {
  SERVICE_NAME: 'sls-v4',
  REGION: 'us-east-1',
  AWS_PROFILE: 'eugene',
  IS_OFFLINE: false,

  /** esbuild */
  ESB_MINIFY: false,
  ESB_SOURCEMAP: true,

  /** tables */
  LOGS_TABLE: ResourceName('logs'),
  LOGS_TABLE_CODE_INDEX: ResourceName('logs-code-index'),
};
