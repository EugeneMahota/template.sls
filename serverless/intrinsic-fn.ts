export function Arn(resource: string): { 'Fn::GetAtt': [string, 'Arn'] } {
  return { 'Fn::GetAtt': [resource, 'Arn'] };
}

export function IndexSub(tableEnv: string, indexEnv: string): { 'Fn::Sub': unknown } {
  return { 'Fn::Sub':
      'arn:aws:dynamodb:${param:REGION}:${AWS::AccountId}:table/${param:'+tableEnv+'}/index/${param:' + indexEnv + '}',
  };
}

export function ResourceName(name: string): string {
  return '${self:service}-' + name + '-${opt:stage, "dev"}';
}
