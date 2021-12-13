import express, { Request, Response } from "express";
import { ProductStore } from "../../../database/models/Product";
import createRoute from "./create";
import showRoute from "./show";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  return res.json(await ProductStore.index());
});

router.use(createRoute);
router.use(showRoute);

export default router;
