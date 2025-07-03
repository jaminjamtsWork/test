import { sql } from "../server.js";

export const companyController = {
  get: async (_, res) => {
    try {
      const response = await sql`SELECT * FROM company ORDER BY id ASC`;
      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  postFaq: async (req, res) => {
    const { title, english, mongolia } = req.body;
    try {
      const response =
        await sql`INSERT INTO company( title, english, mongolia) VALUES(${title},${english},${mongolia}) RETURNING *`;
      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Бааз дээр алдаа гарлаа та баазаа шалгана уу" });
    }
  },
  updateCompany: async (req, res) => {
    const id = req.params.id;
    const { title, english, mongolia } = req.body;
    console.log("aaa", id, req.body);

    try {
      const response = await sql`UPDATE company
    SET 
    title = ${title},
      english = ${english}, 
      mongolia = ${mongolia}
      WHERE id = ${id} 
      RETURNING *`;

      res.status(200).json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
