import express, { Request, Response, NextFunction } from "express";
import { CreateUserRequest } from "../../../types/requests/CreateUserRequest";
import { UserStore } from "../../../database/models/User";
import { generateJwt } from "../../../helpers/jwt";
import { DatabaseError } from "pg";

const router = express.Router();

router.post("/", async (req: Request<{}, {}, CreateUserRequest>, res: Response): Promise<Response> => {
  let user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

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

  return res.json({ token: generateJwt(JSON.stringify(user)) });
});

export default router;
