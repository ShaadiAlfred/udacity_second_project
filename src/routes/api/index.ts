import express from "express";
import usersRoutes from "./users";
import productsRoutes from "./products";

const router = express.Router();

router.get("/", (_: express.Request, res: express.Response): express.Response => {
  return res.send("Select a service");
});

router.use("/users", usersRoutes);
router.use("/products", productsRoutes);

export default router;
