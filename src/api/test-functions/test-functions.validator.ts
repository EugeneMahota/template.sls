import { MiddyValidatorSchema } from '../types';

export const testFunctionValidator: MiddyValidatorSchema = {
  type: 'object',
  properties: {
    isShowError: { type: 'boolean' },
  },
  required: ['isShowError'],
}
