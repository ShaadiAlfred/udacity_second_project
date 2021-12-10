import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { User, UserStore } from "./database/models/User";
import { verifyAuthToken } from "./middlewares";
import router from "./routes";
import jwt from "jsonwebtoken";

const port = 3000;

const app = express();

app.use(cors());

app.use("/", router);

app.use("/create", async (_req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    username: "shadino",
    email: "shadino@gmail.com",
    password: "123456",
  };

  try {
    const newUser = await UserStore.create(user);

    return res.json(jwt.sign(newUser, process.env.TOKEN_SECRET ?? ""));
  } catch (err) {
    return next(err);
  }
});

app.use("/test", verifyAuthToken, async (_req: Request, res: Response, next: NextFunction) => {
  // const email = "shadino@gmail.com";
  // const password = "123456";

  // try {
  //   const user = await UserStore.authenticate(email, password);

  //   if (user !== null) {
  //     return res.json(user);
  //   }

  //   return res.status(401).send("Unauthenticated");
  // } catch (err) {
  //   return next(err);
  // }
  return res.send("Authentication middleware successful");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

export default app;
