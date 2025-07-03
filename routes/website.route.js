import express from "express";
import { websiteController } from "../controllers/website.controller.js";

const websiteRouter = express.Router();

websiteRouter.get("/website", websiteController.getAllWebsites);
websiteRouter.post("/website", websiteController.createWebsite);
websiteRouter.put("/website/:id", websiteController.updateWebsite);

export default websiteRouter;
