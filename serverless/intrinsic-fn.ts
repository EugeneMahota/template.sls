export function FunctionArn(resource: string): { 'Fn::GetAtt': [string, 'Arn'] } {
  return { 'Fn::GetAtt': [resource, 'Arn'] };
}

export function IndexArn(tableEnv: string, indexEnv: string): { 'Fn::Sub': unknown } {
  return { 'Fn::Sub':
      'arn:aws:dynamodb:${param:REGION}:${AWS::AccountId}:table/${param:'+tableEnv+'}/index/${param:'+indexEnv+'}',
  };
}

export function StateMachineArn(stateMachineNameEnv: string): { 'Fn::Sub': unknown } {
  return {
    'Fn::Sub': 'arn:aws:states:${AWS::Region}:${AWS::AccountId}:stateMachine:${param:'+stateMachineNameEnv+'}',
  }
}

export function ResourceName(name: string): string {
  return '${self:service}-' + name + '-${opt:stage, "dev"}';
}
