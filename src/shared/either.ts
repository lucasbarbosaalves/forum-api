// Left / Right (Failure or Success) *Elixir Pattern
export class Left<L, R> {
  readonly _tag = 'Left';
  constructor(readonly value: L) {}

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

export class Right<L, R> {
  readonly _tag = 'Right';
  constructor(readonly value: R) {}

  isRight(): this is Right<L, R> {
    return true;
  }
  isLeft(): this is Left<L, R> {
    return false;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
