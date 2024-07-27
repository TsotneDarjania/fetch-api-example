import express from "express";
import { PORT } from "./config";
import homePageRouter from "./routes/pageRoutes";

const app = express();

app.use(express.static("public"));

app.use("/", homePageRouter);

app.use("/test", async (req, res) => {});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
