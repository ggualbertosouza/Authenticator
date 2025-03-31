export type Either<L, R> = Fail<L, R> | Success<L, R>;

class Fail<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Fail<L, R> {
    return true;
  }

  isRight(): this is Success<L, R> {
    return false;
  }
}

class Success<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isLeft(): this is Fail<L, R> {
    return false;
  }

  isRight(): this is Success<L, R> {
    return true;
  }
}

export const fail = <L, R>(value: L): Either<L, R> => new Fail(value);
export const success = <L, R>(value: R): Either<L, R> => new Success(value);
