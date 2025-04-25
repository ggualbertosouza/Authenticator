import { randomBytes, pbkdf2 } from "node:crypto";
import { BadRequest } from "../error/statusError";
import { Injectable } from "../../presentation/https/utils/inversify";
import { IPasswordService } from "../../domain/service/password";

@Injectable({ key: PasswordService })
class PasswordService implements IPasswordService {
  private ITERATIONS = 10000;
  private KEY_LENGTH = 64;
  private DIGEST = "sha512";

  public async encrypt(password: string): Promise<string> {
    const salt = this.generateSalt();

    return await new Promise<string>((resolve, reject) => {
      pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.KEY_LENGTH,
        this.DIGEST,
        (err, derivedKey) => {
          if (err) reject(new BadRequest("Something went wrong"));

          resolve(`${salt}:${derivedKey.toString("hex")}`);
        },
      );
    });
  }

  public async matches(password: string, storedHash: string): Promise<boolean> {
    const [salt, hash] = storedHash.split(":");

    return await new Promise<boolean>((resolve, reject) => {
      pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.KEY_LENGTH,
        this.DIGEST,
        (err, derivedKey) => {
          if (err) reject(new BadRequest("Something went wrong"));

          resolve(derivedKey.toString("hex") === hash);
        },
      );
    });
  }

  private generateSalt(length: number = 16): string {
    return randomBytes(length).toString("hex");
  }
}

export default PasswordService;
