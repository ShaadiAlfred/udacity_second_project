import express, { Request, Response } from "express";
import { ProductStore } from "../../../database/models/Product";
import createRoute from "./create";

const router = express.Router();

router.get("/", async (_req, res) => {
  return res.json(await ProductStore.index());
});

router.use(createRoute);

export default router;
