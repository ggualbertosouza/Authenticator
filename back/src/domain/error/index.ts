import { ErrorCode } from "./codes";

class DomainError extends Error {
  constructor(code: ErrorCode, details?: string) {
    super(code);
  }
}

export default DomainError;
