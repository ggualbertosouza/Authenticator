export interface IPasswordService {
  encrypt(password: string): Promise<string | null>;
  matches(password: string, storedHash: string): Promise<boolean | null>;
}
