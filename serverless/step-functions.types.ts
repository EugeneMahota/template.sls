export interface StepFunction {
  stepFunctions?: {
    stateMachines: StateMachines;
    validate?: boolean;
  };
}

type StateMachines = {
  [stateMachine: string]: {
    id?: string;
    name: string;
    definition: Definition;
    tracingConfig?: TracingConfig;
  };
};

type TracingConfig = {
  enabled: boolean;
};

type Definition = {
  Comment?: string;
  StartAt: string;
  States: States;
};

type States = {
  [state: string]: Choice | Fail | Map | Task | Parallel | Pass | Wait;
};

type StateBase = {
  Catch?: Catcher[];
  Retry?: Retrier[];
  End?: boolean;
  InputPath?: string;
  Next?: string;
  OutputPath?: string;
  ResultPath?: string;
  ResultSelector?: { [key: string]: string | { [key: string]: string } };
  Type: string;
  Comment?: string;
};

type ChoiceRuleComparison = {
  Variable: string;
  BooleanEquals?: number;
  BooleanEqualsPath?: string;
  IsBoolean?: boolean;
  IsNull?: boolean;
  IsNumeric?: boolean;
  IsPresent?: boolean;
  IsString?: boolean;
  IsTimestamp?: boolean;
  NumericEquals?: number;
  NumericEqualsPath?: string;
  NumericGreaterThan?: number;
  NumericGreaterThanPath?: string;
  NumericGreaterThanEquals?: number;
  NumericGreaterThanEqualsPath?: string;
  NumericLessThan?: number;
  NumericLessThanPath?: string;
  NumericLessThanEquals?: number;
  NumericLessThanEqualsPath?: string;
  StringEquals?: string;
  StringEqualsPath?: string;
  StringGreaterThan?: string;
  StringGreaterThanPath?: string;
  StringGreaterThanEquals?: string;
  StringGreaterThanEqualsPath?: string;
  StringLessThan?: string;
  StringLessThanPath?: string;
  StringLessThanEquals?: string;
  StringLessThanEqualsPath?: string;
  StringMatches?: string;
  TimestampEquals?: string;
  TimestampEqualsPath?: string;
  TimestampGreaterThan?: string;
  TimestampGreaterThanPath?: string;
  TimestampGreaterThanEquals?: string;
  TimestampGreaterThanEqualsPath?: string;
  TimestampLessThan?: string;
  TimestampLessThanPath?: string;
  TimestampLessThanEquals?: string;
  TimestampLessThanEqualsPath?: string;
};

type ChoiceRuleNot = {
  Not: ChoiceRuleComparison;
  Next: string;
};

type ChoiceRuleAnd = {
  And: ChoiceRuleComparison[];
  Next: string;
};

type ChoiceRuleOr = {
  Or: ChoiceRuleComparison[];
  Next: string;
};

type ChoiceRuleSimple = ChoiceRuleComparison & {
  Next: string;
};

type ChoiceRule = ChoiceRuleSimple | ChoiceRuleNot | ChoiceRuleAnd | ChoiceRuleOr;

interface Choice extends StateBase {
  Type: 'Choice';
  Choices: ChoiceRule[];
  Default?: string;
}

interface Fail extends StateBase {
  Type: 'Fail';
  Cause?: string;
  Error?: string;
}

interface Map extends StateBase {
  Type: 'Map';
  ItemsPath: string;
  Iterator: Definition;
}

type Resource = string | { 'Fn::GetAtt': [string, 'Arn'] } | { 'Fn::Join': [string, Resource[]] };

interface TaskParametersForLambda {
  FunctionName?: Resource;
  Payload?: {
    'token.$': string;
    [key: string]: string;
  };
  [key: string]: unknown;
}

interface TaskParametersForStepFunction {
  StateMachineArn: Resource;
  Input?: {
    'AWS_STEP_FUNCTIONS_STARTED_BY_EXECUTION_ID.$': '$$.Execution.Id';
    [key: string]: string;
  };
  Retry?: [{ ErrorEquals?: string[] }];
  End?: boolean;
}

interface Task extends StateBase {
  Type: 'Task';
  Resource: Resource;
  Parameters?:
    | TaskParametersForLambda
    | TaskParametersForStepFunction
    | { [key: string]: string | { [key: string]: string } };
}

interface Pass extends StateBase {
  Type: 'Pass';
  Parameters?: {
    [key: string]: string | Array<unknown> | { [key: string]: string };
  };
}

interface Parallel extends StateBase {
  Type: 'Parallel';
  Branches: Definition[];
}

interface Wait extends StateBase {
  Type: 'Wait';
  Next?: string;
  Seconds?: number;
  TimestampPath?: string;
}

type Catcher = {
  ErrorEquals: ErrorName[];
  Next: string;
  ResultPath?: string;
};

type Retrier = {
  ErrorEquals: string[];
  IntervalSeconds?: number;
  MaxAttempts?: number;
  BackoffRate?: number;
};

type ErrorName =
  | 'States.ALL'
  | 'States.DataLimitExceeded'
  | 'States.Runtime'
  | 'States.Timeout'
  | 'States.TaskFailed'
  | 'States.Permissions'
  | string;
