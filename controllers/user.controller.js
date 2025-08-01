import { sql } from "../server.js";
import { sendEmail } from "../utils/mail.js";
import { generateOTP } from "../utils/otp.js";

export const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await sql`SELECT * FROM users`;
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  checkUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await sql`SELECT * FROM users WHERE username = ${username}`;

      if (user.length == 0) {
        return res
          .status(400)
          .json({ status: "failed", message: "Хэрэглэгчийн нэр буруу байна" });
      }
      if (user[0].password != password) {
        return res.status(400).json({
          status: "failed",
          message: "Хэрэглэгчийн нууц үг буруу байна",
        });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching websites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  generateOTP: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (user.length == 0) {
        return res.status(400).json({
          status: "failed",
          message: "Хэрэглэгчийн э-майл буруу байна",
        });
      }
      const otp = generateOTP();
      sendEmail(email, otp);
      const updated =
        await sql`UPDATE users SET otp = ${otp}, otp_created_at = now()  - INTERVAL '5 minutes' WHERE email = ${email}`;
      return res.status(200).json({
        status: "success",
        message: "Хэрэглэгчийн нууц үг сэргээх код илгээгдлээ",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updatePassword: async (req, res) => {
    const { email, otp, password } = req.body;
    try {
      const user = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (user.length == 0) {
        return res
          .status(400)
          .json({ status: "failed", message: "Э-мэйл буруу байна" });
      }
      if (user[0].otp != otp) {
        return res.status(400).json({
          status: "failed",
          message: "Нэг удаагийн нууц үг буруу байна",
        });
      }
      const updated =
        await sql`UPDATE users SET password = ${password}, otp = null, otp_created_at = null WHERE email = ${email}`;
      return res.status(200).json({
        status: "success",
        message: "Хэрэглэгчийн нууц үг амжилттай өөрчлөгдлөө",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  registerUser: async (req, res) => {
    const { email, username, password } = req.body;
    try {
      const existingUser =
        await sql`SELECT * FROM users WHERE email = ${email}`;
      if (existingUser.length > 0) {
        return res.status(400).json({
          status: "failed",
          message: "Хэрэглэгчийн имэйл хаяг аль хэдийн бүртгэгдсэн байна",
        });
      }

      sendEmail(email);
      const date = new Date();

      const newUser =
        await sql`INSERT INTO users (email, username, password, regiter_date) VALUES (${email}, ${username}, ${password}, ${date}) RETURNING *`;
      return res.status(201).json({
        status: "success",
        message: "Хэрэглэгч амжилттай нэмэгдлээ",
        user: newUser[0],
      });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await sql`DELETE FROM users WHERE id = ${id}`;
      if (deletedUser)
        return res.status(200).json({
          status: "success",
          message: "Хэрэглэгч амжилттай устгагдлаа",
        });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
