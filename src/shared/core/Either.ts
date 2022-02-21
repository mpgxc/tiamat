/* eslint-disable @typescript-eslint/no-unused-vars */
interface IEitherResult<S, F> {
  value: S | F;
  isError: boolean;
}

interface IResultSuccess<S, F> extends IEitherResult<S, unknown> {
  value: S;
  isError: false;
}

interface IResultFailure<S, F> extends IEitherResult<unknown, F> {
  value: F;
  isError: true;
}

type Either<S, F> = IResultSuccess<S, unknown> | IResultFailure<unknown, F>;

const success = <T>(value: T): IResultSuccess<T, unknown> => ({
  value,
  isError: false,
});

const failure = <T>(value: T): IResultFailure<unknown, T> => ({
  value,
  isError: true,
});

export { Either, success, failure, IResultFailure, IResultSuccess };
