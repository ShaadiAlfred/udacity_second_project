import bcrypt from "bcrypt";
import { QueryResult } from "pg";
import { runQuery } from "..";

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  static async create(user: User): Promise<User> {
    const hashedPassword = bcrypt.hashSync(
      user.password + process.env.BCRYPT_PASSWORD,
      parseInt(process.env.SALT_ROUNDS ?? "0"),
    );

    const result = await runQuery(
      `INSERT INTO "users" (username, firstname, lastname, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [user.username, user.firstname, user.lastname, hashedPassword],
    );

    return result.rows[0];
  }

  static async find(usernameOrId: string | number, withPassword = true): Promise<User | null> {
    const $select = `SELECT id, username, firstname, lastname from "users"`;

    let result: QueryResult;

    if (typeof usernameOrId === "string" && isNaN(parseInt(usernameOrId))) {
      const username: string = usernameOrId;
      if (withPassword) {
        result = await runQuery(`SELECT * from "users" WHERE "username" = $1`, [username]);
      } else {
        result = await runQuery($select + ` WHERE "username" = $1`, [username]);
      }
    } else {
      if (withPassword) {
        result = await runQuery(`SELECT * from "users" WHERE "id" = $1`, [usernameOrId]);
      } else {
        result = await runQuery($select + ` WHERE "id" = $1`, [usernameOrId]);
      }
    }

    if (result.rowCount !== 0) {
      return result.rows[0];
    }

    return null;
  }

  static async index(): Promise<User[] | void> {
    const result = await runQuery(`SELECT id, username, firstname, lastname from "users"`);

    if (result.rowCount === 0) {
      return [];
    }

    return result.rows;
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
