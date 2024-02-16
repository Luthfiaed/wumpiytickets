import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// scrypt is a callback-based function
const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPass: string, inputPass: string) {
    const [storedHashedPassword, salt] = storedPass.split(".");
    const buf = (await scryptAsync(inputPass, salt, 64)) as Buffer;

    return buf.toString("hex") === storedHashedPassword;
  }
}
