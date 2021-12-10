import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token === undefined) {
      throw new Error("Missing authorization header");
    }

    jwt.verify(token, process.env.TOKEN_SECRET ?? "");
  } catch (err) {
    return res.status(401).send("Authentication failed");
  }

  next();
};
