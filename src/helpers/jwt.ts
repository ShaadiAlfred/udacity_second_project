import jwt from "jsonwebtoken";
import { User } from "../database/models/User";

export const generateJwt = (payload: string): string => {
  return jwt.sign(payload, process.env.TOKEN_SECRET ?? "");
};

export const verifyJwt = async (token: string): Promise<User | void> => {
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET ?? "");

    return JSON.parse(String(user));
  } catch (err) {
    return;
  }
};
