import express, { Request, Response } from "express";
import createRoute from "./create";

const router = express.Router();

router.use(createRoute);

export default router;
