import express from "express";
import createRoute from "./create";
import showRoute from "./show";

const router = express.Router();

router.use(createRoute);
router.use(showRoute);

export default router;
