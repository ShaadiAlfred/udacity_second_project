import express, { Request, Response, NextFunction } from "express";
import { CreateUserRequest } from "../../../types/CreateUserRequest";
import { UserStore } from "../../../database/models/User";
import { generateJwt } from "../../../helpers/jwt";
import { DatabaseError } from "pg";

const router = express.Router();

router.post("/", async (req: Request<{}, {}, CreateUserRequest>, res: Response): Promise<Response> => {
  let user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };

  if (
    user.username === undefined ||
    user.firstname === undefined ||
    user.lastname === undefined ||
    user.password === undefined
  ) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  if (
    user.username.length === 0 ||
    user.firstname.length === 0 ||
    user.lastname.length === 0 ||
    user.password.length === 0
  ) {
    return res.status(400).json({ message: "Parameters cannot be empty string" });
  }

  try {
    user = await UserStore.create(user);
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code == "23505") {
        return res.status(400).json({ message: "Username already used" });
      }
    }

    return res.status(500).json({ message: "Failed to create a new user" });
  }

  return res.json({ token: generateJwt(user) });
});

export default router;
