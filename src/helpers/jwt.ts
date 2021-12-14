import jwt from "jsonwebtoken";
import { User } from "../database/models/User";

export const generateJwt = (payload: object | string | Buffer): string => {
  return jwt.sign(payload, process.env.TOKEN_SECRET ?? "");
};

export const verifyJwt = async (token: string): Promise<User | null> => {
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET ?? "");

    return JSON.parse(String(user)) as User;
  } catch (err) {
    return null;
  }
};
