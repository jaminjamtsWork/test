import express from "express";
import { faqController } from "../controllers/faq.controller.js";

const faqRouter = express.Router();

faqRouter.get("/faq", faqController.get);
faqRouter.post("/faq", faqController.postFaq);
faqRouter.put("/faq/:id", faqController.updateFaq);
faqRouter.delete("/faq/:id", faqController.deleteFaq);

export default faqRouter;
