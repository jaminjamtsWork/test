import {Router} from "express";
import { sustainabilityController } from "../controllers/sustainability.controller.js";


const sustainabilityRouter = Router();

sustainabilityRouter.get("/sustainability", sustainabilityController.getAll);
sustainabilityRouter.post("/sustainability", sustainabilityController.post);
sustainabilityRouter.put("/sustainability/:id", sustainabilityController.update);
sustainabilityRouter.delete("/sustainability/:id", sustainabilityController.delete);

export default sustainabilityRouter;
