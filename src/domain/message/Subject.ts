import { Either, failure, success } from '@shared/core/Either';

import { InvalidSubjectError } from './errors/InvalidSubjectError';

class Subject {
  private constructor(private readonly _value: string) {}

  private static validate(value: string): boolean {
    if (!value || value.trim().length < 5 || value.trim().length > 50) {
      return false;
    }

    return true;
  }

  get value(): string {
    return this._value;
  }

  public static build(value: string): Either<Subject, InvalidSubjectError> {
    if (!this.validate(value)) {
      return failure(InvalidSubjectError.build(value));
    }

    return success(new this(value));
  }
}

export { Subject };
