import { sql } from "../server.js";
export const newsController = {
  getAllNews: async (_, res) => {
    try {
      const header = await sql`SELECT * FROM website_headers WHERE id = 4`;
      const response = await sql`SELECT * FROM news`;

      res.status(200).json({ success: true, data: { header, response } });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getByIdNews: async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
    try {
      const response = await sql`SELECT * FROM news WHERE id = ${id}`;

      if (response.length === 0) {
        return res.status(404).json({ error: "News not found" });
      }

      res.status(200).json(response[0]);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateNews: async (req, res) => {
    const id = req.params.id;
    const {
      entitle,
      mntitle,
      endescription,
      mndescription,
      enjournalist,
      mnjournalist,
      image_url,
      thumbnail,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
    try {
      const response = await sql`
       UPDATE news 
       SET 
       entitle = ${entitle}, 
       mntitle = ${mntitle},
      endescription = ${endescription},
      mndescription = ${mndescription},
      enjournalist = ${enjournalist},
      mnjournalist = ${mnjournalist},
      image_url = ${image_url},
      thumbnail = ${thumbnail}
       WHERE id = ${id} RETURNING *`;

      res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.log("Error updating news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createNews: async (req, res) => {
    let {
      entitle,
      mntitle,
      endescription,
      mndescription,
      enjournalist,
      mnjournalist,
      image_url,
      thumbnail,
    } = req.body;
    const date = new Date();

    try {
      const response =
        await sql`INSERT INTO news(entitle, mntitle, endescription, mndescription, enjournalist,mnjournalist, image_url, thumbnail, date) VALUES (${entitle}, ${mntitle}, ${endescription}, ${mndescription}, ${enjournalist},${mnjournalist}, ${image_url}, ${thumbnail}, ${date}) RETURNING *`;
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteNews: async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const response = await sql`DELETE FROM news WHERE id = ${id}`;
      res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getPaginatedNews: async (req, res) => {
    try {
      const header = await sql`SELECT * FROM website_headers WHERE id = 4`;
      const data = await sql`SELECT id, entitle,
        mntitle,
        endescription,
        mndescription,
        thumbnail, 
        date FROM news ORDER BY date DESC `;

      const [{ count }] = await sql`SELECT COUNT(*)::int as count FROM news`;
      res.status(200).json({ header, data, total: count });
    } catch (error) {
      console.error("Error fetching paginated news:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
