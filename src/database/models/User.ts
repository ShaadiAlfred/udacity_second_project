import bcrypt from "bcrypt";
import { runQuery } from "..";

export type User = {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
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
      `INSERT INTO "users" (username, firstName, lastName, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [user.username, user.firstName, user.lastName, user.password],
    );

    return result.rows[0];
  }

  static async find(username: string): Promise<User | null> {
    const result = await runQuery(`SELECT * from "users" WHERE "username" = $1`, [username]);

    if (result.rowCount !== 0) {
      return result.rows[0];
    }

    return null;
  }

  static async authenticate(username: string, password: string): Promise<User | null> {
    const user = await this.find(username);

    if (user === null) {
      return null;
    }

    if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
      return user;
    }

    return null;
  }
}
