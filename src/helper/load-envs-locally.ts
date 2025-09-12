import { execSync } from 'child_process';
import fs from 'fs';

const stage = process.env.STAGE ?? 'dev';
const envPath = '../../../.env';

export function loadEnvsLocally() {
  const localIndicators = ['/Users/', 'C:\\Users\\', '/home/'];
  const isLocalRun = localIndicators.some((indicator) => __dirname.includes(indicator));
  if (!isLocalRun || process.env.IS_OFFLINE === 'true') {
    return;
  }
  if (!fs.existsSync(envPath)) {
    loadEnvsFromCloud(stage);
  }
  let envFile = fs.readFileSync(envPath, 'utf8');
  let envs = parseEnvs(envFile);
  if (envs.STAGE !== stage) {
    loadEnvsFromCloud(stage);
    envFile = fs.readFileSync(envPath, 'utf8');
    envs = parseEnvs(envFile);
  }
  Object.entries(envs).forEach(([name, value]) => {
    process.env[name] = value;
  });
}

function loadEnvsFromCloud(stage: string) {
  execSync(`sls export-env --stage ${stage}`, { cwd: '../../../', encoding: 'utf-8' });
}

function parseEnvs(content: string): Record<string, string> {
  return content
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .reduce<Record<string, string>>((acc, line) => {
      const [key, ...rest] = line.split('=');
      acc[key.trim()] = rest.join('=').trim();
      return acc;
    }, {});
}
