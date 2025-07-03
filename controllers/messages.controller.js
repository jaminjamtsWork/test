import { sql } from "../server.js";
import { sendCollabrationEmail } from "../utils/mail.js";
export const messageController = {
  web: async (_, res) => {
    try {
      const response = await sql`SELECT * FROM website_headers WHERE id = 5`;
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching messagess:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllMessages: async (_, res) => {
    try {
      const response = await sql`SELECT * FROM messages ORDER BY date DESC`;
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching messagess:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getByIdMessages: async (req, res) => {
    const { id } = req.params;

    try {
      const response = await sql`SELECT * FROM messages WHERE id = ${id}`;
      if (response.length === 0) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(200).json({ stattus: "success", data: response[0] });
    } catch (error) {
      console.error("Error fetching message by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createMessage: async (req, res) => {
    const { purpose, firstname, email, plan } = req.body;

    sendCollabrationEmail(purpose, email, firstname, plan);

    const date = new Date();

    try {
      const response = await sql`INSERT INTO messages(
        purpose,
      firstname,
      email,
      plan, date) VALUES (${purpose},${firstname},${email},${plan},${date}) RETURNING *`;
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteMessages: async (req, res) => {
    const id = req.params.id;
    try {
      const response = await sql`DELETE FROM messages Where id = ${id}`;
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
