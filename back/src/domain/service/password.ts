import DomainError from "../error";

export interface IPasswordService {
  encrypt(password: string): Promise<string>;
  compare(password: string, storedHash: string): Promise<boolean>;
}
