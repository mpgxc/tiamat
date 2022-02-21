import { AppError } from '@shared/core/AppError';

class InvalidBodyError extends AppError {
  private constructor(value: string) {
    super(`The Body "${value}" is invalid!`, 'InvalidBodyError');
  }

  static build(value: string): InvalidBodyError {
    return new this(value);
  }
}

export { InvalidBodyError };
