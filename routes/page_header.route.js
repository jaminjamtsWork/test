import express from "express";
import { headerController } from "../controllers/pageheader.controller.js";

const pageHeader = express.Router();

pageHeader.get("/header", headerController.getAll);
pageHeader.get("/header/:id", headerController.getByID);
pageHeader.put("/header/:id", headerController.updateHeader);

export default pageHeader;
