import { Serverless } from 'serverless/aws';
import { StepFunction } from './step-functions.types';

export type CustomServerless = Serverless & SlsStages & Build & StepFunction;

export type AWSPartitial = Omit<Partial<CustomServerless>, 'provider'> & { provider?: Partial<CustomServerless['provider']> };

interface Stage {
  params: Record<string, any>;
  observability?: boolean;
}

export interface SlsStages {
  stages?: {
    default: Stage;
    [newStage: string]: Stage;
  }
}

interface Build {
  build?: {
    esbuild: {
      [prop: string]: any;
    }
  };
}
