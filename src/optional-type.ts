

export class Optional<T> {
  private constructor(private value: T) {}

  static of = <T>(value: T) => {
    return new Optional(value);
  };

  static empty = <T>() => {
    return new Optional(null as T);
  };

  ifPresent = <S>(consumer: (val: T) => S) => {
    if (this.isPresent()) {
      return consumer(this.value);
    }
  };

  orElse = (other: T) => {
    if (this.isPresent()) {
      return this.value;
    }
    return other;
  };

  orElseGet = (otherGet: () => T) => {
    if (this.isPresent()) {
      return this.value;
    }
    return otherGet();
  };

  orElseThrow = (exceptionSupplier: () => Error) => {
    if (this.isPresent()) {
      return this.value;
    }
    throw exceptionSupplier();
  };

  map = <S>(mapper: (val: T) => S) => {
    if (this.isPresent()) {
      return Optional.of(mapper(this.value));
    }
  };

  get = (): T => {
    if (this.isPresent()) {
      return this.value;
    }
    throw new Error(`NoSuchElement`);
  };

  isPresent = () => {
    return this.value != null;
  };
}
