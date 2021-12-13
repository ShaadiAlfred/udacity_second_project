import express, { Request, Response } from "express";
import { UserStore } from "../../../database/models/User";
import { generateJwt } from "../../../helpers/jwt";

const router = express.Router();

router.post(
  "/login",
  async (req: Request<{}, {}, { username: string; password: string }>, res: Response): Promise<Response> => {
    if (req.body.username === undefined || req.body.password === undefined) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const user = await UserStore.authenticate(req.body.username, req.body.password);

    if (user === null) {
      return res.status(400).json({ message: "Wrong credentials or unregistered user" });
    }

    const token = generateJwt(JSON.stringify(user));

    return res.json({ token });
  },
);

export default router;
