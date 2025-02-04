import { log } from './logger';

export function wait(seconds: number): Promise<void> {
  return new Promise((res) => setTimeout(res, seconds * 1000));
}

export function logExecutionTime(_, funcName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();

    const executionTimeMs = end - start;
    const executionTimeMinutes = (executionTimeMs / 1000 / 60).toFixed(4);

    log(`EXECUTION TIME "${funcName}": ${executionTimeMinutes} minutes`);
    return result;
  };

  return descriptor;
}
