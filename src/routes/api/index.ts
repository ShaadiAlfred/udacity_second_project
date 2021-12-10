import express from "express";

const router = express.Router();

router.get("/", (_: express.Request, res: express.Response): express.Response => {
  return res.send("Select a service");
});

export default router;
