import express from "express";
import { messageController } from "../controllers/messages.controller.js";

const messageRouter = express.Router();

messageRouter.get("/contactHeader", messageController.web);
messageRouter.get("/messages", messageController.getAllMessages);
messageRouter.get("/messages/:id", messageController.getByIdMessages);
messageRouter.post("/messages", messageController.createMessage);
messageRouter.delete("/messages/:id", messageController.deleteMessages);

export default messageRouter;
