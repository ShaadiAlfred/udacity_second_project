import express, { Request, Response } from "express";
import { ProductStore } from "../../../database/models/Product";

const router = express.Router();

router.get("/:id", async (req: Request<{ id: number }>, res: Response) => {
  if (req.body.id === undefined) {
    return res.status(200).json({ message: "Missing parameter" });
  }
  return res.json(await ProductStore.find(req.params.id));
});

export default router;
