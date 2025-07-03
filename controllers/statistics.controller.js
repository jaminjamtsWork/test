import { sql } from "../server.js";
export const statisticsController = {
  getAll: async (_, res) => {
    try {
      const response = await sql`SELECT * FROM statistics`;
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  post: async (req, res) => {
    const { english, mongolia } = req.body;
    try {
      const response =
        await sql`INSERT INTO statistics(english,mongolia) VALUES(${english},${mongolia}) returning *`;
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const { english, mongolia } = req.body;

    try {
      const response =
        await sql`UPDATE statistics SET english = ${english},mongolia= ${mongolia} WHERE id = ${id} RETURNING *`;
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await sql`DELETE FROM statistics Where id = ${id}`;
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
