import { sql } from "../server.js";
export const sustainabilityController = {
  getAll: async (_, res) => {
    try {
      const title = await sql`SELECT * FROM sustainability WHERE id = 1`;
      const cerficates = await sql`SELECT * FROM sustainability WHERE id != 1`;
      const hero = await sql`SELECT * FROM website_headers WHERE id = 3`;
      return res
        .status(200)
        .json({ success: true, hero, response: { title, cerficates } });
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Searver Error" });
    }
  },
  post: async (req, res) => {
    const { entitle, mntitle, endescription, mndescription, image_url } =
      req.body;
    const date = new Date();

    try {
      const response =
        await sql`INSERT INTO sustainability(entitle,mntitle,endescription,mndescription,image_url,date) VALUES (${entitle},${mntitle},${endescription},${mndescription},${image_url}, ${date}) returning *`;
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const { entitle, mntitle, endescription, mndescription, image_url } =
      req.body;
    const date = new Date();

    try {
      const response =
        await sql`UPDATE sustainability SET entitle = ${entitle},mntitle= ${mntitle},endescription=${endescription},mndescription=${mndescription},image_url=${image_url} ,date=${date} WHERE id = ${id} RETURNING *`;
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await sql`DELETE FROM sustainability Where id = ${id}`;
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
