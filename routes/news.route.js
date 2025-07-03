import express from "express";
import { newsController } from "../controllers/news.controller.js";

const newsRouter = express.Router();

newsRouter.get("/news/paginated", newsController.getPaginatedNews);
newsRouter.get("/news", newsController.getAllNews);
newsRouter.get("/news/:id", newsController.getByIdNews);
newsRouter.put("/news/:id", newsController.updateNews);
newsRouter.post("/news", newsController.createNews);
newsRouter.delete("/news/:id", newsController.deleteNews);

export default newsRouter;
