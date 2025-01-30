import { Serverless } from 'serverless/aws';

export type AWSPartitial = Omit<Partial<Serverless>, 'provider'> & { provider?: Partial<Serverless['provider']> };
