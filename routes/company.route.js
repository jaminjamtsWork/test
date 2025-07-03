import express from "express";
import { companyController } from "../controllers/company.controller.js";

export const companyRouter = express.Router();

companyRouter.get("/company", companyController.get);
companyRouter.post("/company", companyController.postFaq);
companyRouter.put("/company/:id", companyController.updateCompany);
