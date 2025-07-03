import express from "express";
import {
  getAnalyticsViews,
  getAnalyticsSummary,
} from "../controllers/analytics.controller.js";

const router = express.Router();
router.get("/summary", getAnalyticsSummary);
router.get("/views", getAnalyticsViews);
export default router;
