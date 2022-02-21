import { AppError } from '@shared/core/AppError';

class InvalidEmailError extends AppError {
  private constructor(value: string) {
    super(`The Email "${value}" is invalid!`, 'InvalidEmailError');
  }

  static build(value: string): InvalidEmailError {
    return new this(value);
  }
}

export { InvalidEmailError };
