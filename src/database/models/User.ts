import bcrypt from "bcrypt";
import { runQuery } from "..";

export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
};

export class UserStore {
  static async create(user: User): Promise<User> {
    const hashedPassword = bcrypt.hashSync(
      user.password + process.env.BCRYPT_PASSWORD,
      parseInt(process.env.SALT_ROUNDS ?? "0"),
    );

    user.password = hashedPassword;

    const result = await runQuery(
      `INSERT INTO "users" (username, email, password) VALUES ($1, $2, $3)
      RETURNING id, email, username, password`,
      [user.username, user.email, user.password],
    );

    console.log(result.rows);

    return result.rows[0];
  }

  static async find(email: string): Promise<User | null> {
    const result = await runQuery(`SELECT * from "users" WHERE "email" = $1`, [email]);

    if (result.rowCount !== 0) {
      return result.rows[0];
    }

    return null;
  }

  static async authenticate(email: string, password: string): Promise<User | null> {
    const user = await this.find(email);

    if (user === null) {
      return null;
    }

    if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
      return user;
    }

    return null;
  }
}
