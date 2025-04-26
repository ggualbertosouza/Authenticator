export interface ISessionUseCase {
  refreshSession(token: string): Promise<string>;
  invalidateSession(token: string): Promise<void>;
}
