import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../database/models/User";

export const hasValidToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token === undefined) {
      throw new Error("Missing authorization header");
    }

    req.user = jwt.verify(token, process.env.TOKEN_SECRET ?? "") as User;
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  next();
};
