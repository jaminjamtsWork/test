import { BetaAnalyticsDataClient } from "@google-analytics/data";
import dotenv from "dotenv";
dotenv.config();

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export const getAnalyticsViews = async (req, res) => {
  try {
    const { timeframe } = req.query;
    const now = new Date();
    const nowMongolia = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const isoToday = nowMongolia.toISOString().split("T")[0];

    let startDate;
    const d = new Date(nowMongolia);
    switch (timeframe) {
      case "day":
        startDate = isoToday;
        break;
      case "week":
        d.setDate(d.getDate() - 7);
        break;
      case "month":
        d.setMonth(d.getMonth() - 1);
        break;
      case "last_3_months":
        d.setMonth(d.getMonth() - 3);
        break;
      case "last_6_months":
        d.setMonth(d.getMonth() - 6);
        break;
      case "year":
        d.setFullYear(d.getFullYear() - 1);
        break;
      default:
        d.setDate(d.getDate() - 7);
    }
    if (!startDate) startDate = d.toISOString().split("T")[0];

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate: isoToday }],
      dimensions: [
        { name: timeframe === "day" ? "dateHour" : "date" },
        { name: "pagePath" },
        { name: "country" },
        { name: "city" },
      ],
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
        { name: "newUsers" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
        { name: "engagedSessions" },
      ],
      limit: 1000,
    });

    const rows = response.rows || [];
    const formatted = rows.map((row) => {
      const [dateOrHour, path, country, city] = row.dimensionValues.map(
        (d) => d.value
      );
      const [
        screenPageViews,
        activeUsers,
        newUsers,
        avgSession,
        bounceRate,
        engagedSessions,
      ] = row.metricValues.map((m) => Number(m.value));

      return {
        dateOrHour,
        path,
        country,
        city,
        screenPageViews,
        activeUsers,
        newUsers,
        avgSession,
        bounceRate,
        engagedSessions,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error("GA API Error:", err);
    res.status(500).json({ error: "Failed to fetch GA data" });
  }
};

export const getAnalyticsSummary = async (req, res) => {
  try {
    const { timeframe } = req.query;
    const now = new Date();
    const nowMongolia = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const isoToday = nowMongolia.toISOString().split("T")[0];

    let startDate;
    const d = new Date(nowMongolia);
    switch (timeframe) {
      case "week":
        d.setDate(d.getDate() - 7);
        break;
      case "month":
        d.setMonth(d.getMonth() - 1);
        break;
      case "year":
        d.setFullYear(d.getFullYear() - 1);
        break;
      default:
        d.setDate(d.getDate() - 7);
    }
    startDate = d.toISOString().split("T")[0];

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate: isoToday }],
      metrics: [{ name: "activeUsers" }, { name: "newUsers" }],
    });

    const [activeUsers, newUsers] = response.rows?.[0]?.metricValues.map((m) =>
      Number(m.value)
    ) || [0, 0];
    res.json({ activeUsers, newUsers });
  } catch (err) {
    console.error("GA Summary Error:", err);
    res.status(500).json({ error: "Failed to fetch GA summary" });
  }
};
