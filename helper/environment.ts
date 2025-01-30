export type Stage = 'local' | 'dev' | 'test' | 'prod';

export function getStage(): Stage {
  return getEnv('STAGE') as Stage;
}

export function isStage(stage: Stage): boolean {
  return getStage() === stage;
}

export function getEnv(name: string, required?: true): string;
export function getEnv(name: string, required: false): string | undefined;
export function getEnv(name: string, required = true): string | undefined {
  const v: string | undefined = process.env[name];

  if (required && v == undefined) {
    throw new Error(`Missing environment variable ${name}`);
  }

  return v;
}

export const isLOCAL: boolean = getStage() === 'local' as const;
export const isDEV: boolean = getStage() === 'dev' || getStage() === 'local' as const;
export const isTEST: boolean = getStage() === 'test' as const;
export const isPROD: boolean = getStage() === 'prod' as const;
