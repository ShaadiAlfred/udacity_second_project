import express from "express";
import createRoute from "./create";

const router = express.Router();

router.use(createRoute);

export default router;
