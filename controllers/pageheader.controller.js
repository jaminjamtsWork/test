import { sql } from "../server.js";

export const headerController = {
  getAll: async (_, res) => {
    try {
      const response = await sql`SELECT * FROM website_headers ORDER BY ID asc`;
      res.status(200).json({ success: true, response });
    } catch (error) {
      throw new Error({ status: 500, message: error.message });
    }
  },
  getByID: async (req, res) => {
    const id = req.params.id;
    try {
      const response =
        await sql`SELECT * FROM website_headers WHERE id = ${id} `;
      res.status(200).json(response);
    } catch (error) {
      throw new Error({ status: 500, message: error.message });
    }
  },
  updateHeader: async (req, res) => {
    const id = req.params.id;
    let { entitle, mntitle, ensubtitle, mnsubtitle, image_url } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    entitle = entitle ?? null;
    mntitle = mntitle ?? null;
    ensubtitle = ensubtitle ?? null;
    mnsubtitle = mnsubtitle ?? null;
    image_url = image_url ?? null;

    try {
      const response =
        await sql`UPDATE website_headers SET entitle=${entitle}, mntitle=${mntitle}, ensubtitle=${ensubtitle}, mnsubtitle=${mnsubtitle},image_url=${image_url} WHERE id = ${id} RETURNING *`;
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating website:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
