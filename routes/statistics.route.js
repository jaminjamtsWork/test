import express from "express";
import { statisticsController } from "../controllers/statistics.controller.js";

const statisticsRouter = express.Router();

statisticsRouter.get("/statistics", statisticsController.getAll);
statisticsRouter.post("/statistics", statisticsController.post);
statisticsRouter.put("/statistics/:id", statisticsController.update);
statisticsRouter.delete("/statistics/:id", statisticsController.delete);

export default statisticsRouter;
