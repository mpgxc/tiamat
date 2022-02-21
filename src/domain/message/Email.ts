import { Either, failure, success } from '@shared/core/Either';

import { InvalidEmailError } from './errors/InvalidEmailError';

class Email {
  private constructor(private readonly _value: string) {}

  private static format(value: string): string {
    return value.replace(/\s/g, '').toLowerCase();
  }

  private static validate(value: string): boolean {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!pattern.test(value)) {
      return false;
    }

    return true;
  }

  get value(): string {
    return this._value;
  }

  public static build(value: string): Either<Email, InvalidEmailError> {
    const formatedValue = this.format(value);

    if (!this.validate(formatedValue)) {
      return failure(InvalidEmailError.build(value));
    }

    return success(new this(formatedValue));
  }
}

export { Email };
