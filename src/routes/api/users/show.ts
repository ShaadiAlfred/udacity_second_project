import express, { Request, Response } from "express";
import { User, UserStore } from "../../../database/models/User";
import { hasValidToken } from "../../../middlewares";

const router = express.Router();

router.get("/:id", hasValidToken, async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<Response> => {
  let user: User | null;

  if (isNaN(parseInt(req.params.id))) {
    const username: string = req.params.id;
    user = await UserStore.find(username, false);
  } else {
    const userId: number = parseInt(req.params.id);
    user = await UserStore.find(userId, false);
  }

  return res.json(user);
});

export default router;
