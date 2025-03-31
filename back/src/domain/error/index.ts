abstract class DomainError {
  constructor(
    public readonly code: string,
    public readonly message: string
  ) {}

  public is<T extends DomainError>(errorType: new (...args: any[]) => T) {
    return this instanceof errorType;
  }
}

export default DomainError;
