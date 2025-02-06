export interface LambdaEvent<Body, PathParams, QueryParams, Context> {
  body: Body;
  enhancedAuthContext?: Context;
  path?: PathParams;
  query?: QueryParams;
}

export interface MiddyValidatorSchema {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  required?: string[];
  properties?: Record<string, MiddyValidatorSchema>;
  additionalProperties?: boolean | MiddyValidatorSchema;
  items?: MiddyValidatorSchema | MiddyValidatorSchema[];
  enum?: any[];
  const?: any;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minProperties?: number;
  maxProperties?: number;
  dependencies?: Record<string, string[] | MiddyValidatorSchema>;
  oneOf?: MiddyValidatorSchema[];
  anyOf?: MiddyValidatorSchema[];
  allOf?: MiddyValidatorSchema[];
  not?: MiddyValidatorSchema;
  definitions?: Record<string, MiddyValidatorSchema>;
}
