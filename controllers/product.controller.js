import { sql } from "../server.js";
export const productController = {
  get: async (_, res) => {
    try {
      const hero = await sql`SELECT * FROM website_headers WHERE id = 2`;
      const response = await sql`SELECT * FROM products order by id`;
      res.status(200).json({ success: true, data: { hero, response } });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  },

  post: async (req, res) => {
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

    try {
      const response =
        await sql`INSERT INTO products(title,entitle,mntitle,endescription,mndescription, image_url1, image_url2, image_url3, image_url4) VALUES (${title},${entitle}, ${mntitle},${endescription},${mndescription},${image_url1},${image_url2},${image_url3},${image_url4} ) RETURNING *`;
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating website:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  put: async (req, res) => {
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

    try {
      const response = await sql`UPDATE products 
      SET entitle = ${entitle}, mntitle = ${mntitle}, endescription = ${endescription}, mndescription = ${mndescription}, image_url1 = ${image_url1},image_url2 = ${image_url2},image_url3 = ${image_url3}, image_url4 = ${image_url4}
       WHERE id = ${id} RETURNING *`;
      res.status(201).json({ success: true, data: response });
    } catch (error) {
      console.error("Error creating website:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
