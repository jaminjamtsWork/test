import { sql } from "../server.js";

export const websiteController = {
  getAllWebsites: async (_, res) => {
    try {
      const hero = await sql`SELECT * FROM website_headers WHERE id = 1`;
      const response = await sql`SELECT * FROM website ORDER BY ID asc`;
      const faq = await sql`SELECT * FROM FAQ`;

      res.status(200).json({
        success: true,
        data: { hero, response, faq },
      });
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createWebsite: async (req, res) => {
    let {
      title,
      entitle,
      mntitle,
      endescription,
      mndescription,
      image_url1,
      image_url2,
      image_url3,
      image_url4,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    entitle = entitle ?? null;
    mntitle = mntitle ?? null;
    endescription = endescription ?? null;
    mndescription = mndescription ?? null;
    image_url1 = image_url1 ?? null;
    image_url2 = image_url2 ?? null;
    image_url3 = image_url3 ?? null;
    image_url4 = image_url4 ?? null;

    try {
      const response =
        await sql`INSERT INTO website(title,entitle,mntitle,endescribtion,mndescription, image_url1,image_url2,image_url3,image_url4) VALUES (${title},${entitle}, ${mntitle},${endescribtion},${mndescription},${image_url1},${image_url2},${image_url3},${image_url4}) RETURNING *`;
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating website:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateWebsite: async (req, res) => {
    const id = req.params.id;
    let {
      entitle,
      mntitle,
      endescription,
      mndescription,
      image_url1,
      image_url2,
      image_url3,
      image_url4,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    entitle = entitle ?? null;
    mntitle = mntitle ?? null;
    endescription = endescription ?? null;
    mndescription = mndescription ?? null;
    image_url1 = image_url1 ?? null;
    image_url2 = image_url2 ?? null;
    image_url3 = image_url3 ?? null;
    image_url4 = image_url4 ?? null;

    try {
      const response =
        await sql`UPDATE website SET entitle=${entitle}, mntitle=${mntitle}, endescription=${endescription}, mndescription=${mndescription},image_url1=${image_url1}, image_url2 = ${image_url2}, image_url3 = ${image_url3}, image_url4 = ${image_url4} WHERE id = ${id} RETURNING *`;

      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating website:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
