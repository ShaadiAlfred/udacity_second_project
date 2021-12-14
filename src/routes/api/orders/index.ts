import express from "express";
import createRoute from "./create";
import currentOrderRoute from "./current";

const router = express.Router();

router.use(createRoute);
router.use(currentOrderRoute);

export default router;
