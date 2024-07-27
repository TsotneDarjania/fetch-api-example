import { Router } from "express";
import { getFile } from "../utls/helper";

const homePageRouter = Router();

homePageRouter.get("/", async (req, res) => {
  const homePage = await getFile("src/html/homepage.html");
  res.send(homePage);
});

export default homePageRouter;
