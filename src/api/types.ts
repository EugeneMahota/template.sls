export interface LambdaEvent<Body, PathParams, QueryParams, Context> {
  body: Body;
  enhancedAuthContext?: Context;
  path?: PathParams;
  query?: QueryParams;
}
