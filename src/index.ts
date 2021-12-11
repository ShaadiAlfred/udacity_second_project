import express from "express";
import cors from "cors";
import router from "./routes";
import bodyParser from "body-parser";

const port = 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

export default app;
