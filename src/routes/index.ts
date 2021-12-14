import express, { Request, Response } from "express";
import apiRoutes from "./api";

const router = express.Router();

router.get("/", (_req: Request, res: Response): Response => {
  return res.send("Hello World");
});

router.use("/api", apiRoutes);

export default router;
