import { sql } from "../server.js";

export const faqController = {
  get: async (_, res) => {
    try {
      const response = await sql`SELECT * FROM faq`;
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getHeader: async (_, res) => {
    try {
      const response = await sql`SELECT * FROM website_headers WHERE id = 6`;
      res.status(200).json(response);
    } catch {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  postFaq: async (req, res) => {
    const { mnquestion, enquestion, mnanswer, enanswer } = req.body;
    try {
      const response =
        await sql`INSERT INTO faq(mnquestion,enquestion,mnanswer,enanswer) VALUES(${mnquestion},${enquestion},${mnanswer},${enanswer}) RETURNING *`;
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateFaq: async (req, res) => {
    const id = req.params.id;
    const { mnquestion, enquestion, mnanswer, enanswer } = req.body;

    try {
      const response = await sql`UPDATE faq 
    SET 
    mnquestion = ${mnquestion},
      enquestion = ${enquestion}, 
      mnanswer = ${mnanswer},
      enanswer = ${enanswer} 
      WHERE id = ${id} 
      RETURNING *`;

      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteFaq: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await sql`DELETE FROM faq WHERE id = ${id}`;
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
