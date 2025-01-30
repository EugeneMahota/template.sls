import { AxiosError } from 'axios';

export function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof Error && !!(error as any).isAxiosError;
}

export async function retryRequestIf<V>(
  boundFn: (...args: any) => Promise<V>,
  times = 3,
): Promise<V> {
  let attempts = times,
      result!: V,
      error: any,
      isError  = false;

  while (attempts) {
    try {
      result = await boundFn();
    } catch (reqError) {
      const shouldRetry = isAxiosError(reqError);

      if (shouldRetry && attempts > 1) {
        attempts--;
        continue;
      }

      isError = true;
      error = reqError;
    }

    break;
  }

  if (isError) {
    throw error;
  }

  return result;
}
