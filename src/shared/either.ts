// Left / Right (Failure or Success) *Elixir Pattern
export class Left<L> {
  readonly _tag = 'Left';
  constructor(readonly value: L) {}
}

export class Right<R> {
  readonly _tag = 'Right';
  constructor(readonly value: R) {}
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
