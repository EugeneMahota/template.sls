import { all } from 'deepmerge';
import { Serverless } from 'serverless/aws';
import { AWSPartitial } from './types';

export function joinParts(master: Serverless, parts: AWSPartitial[]): Serverless {
  return all([master].concat(parts as Serverless[])) as Serverless;
}
