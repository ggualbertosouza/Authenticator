import { Session } from "../types/session";

export interface ISessionService {
  create(userId: string): Promise<string>;
  get(token: string): Promise<Session>;
  refresh(token: string): Promise<string>;
  delete(token: string): Promise<void>;
}
