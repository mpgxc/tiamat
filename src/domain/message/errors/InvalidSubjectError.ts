import { AppError } from '@shared/core/AppError';

class InvalidSubjectError extends AppError {
  private constructor(value: string) {
    super(`The Subject "${value}" is invalid!`, 'InvalidSubjectError');
  }

  static build(value: string): InvalidSubjectError {
    return new this(value);
  }
}

export { InvalidSubjectError };
