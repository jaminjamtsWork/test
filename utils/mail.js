import nodemailer from "nodemailer";

async function sendEmail(to, otp) {
  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jaminjamts12@gmail.com",
      pass: "scpb ckkd gmfa krnj",
    },
  });

  let mailOptions;

  if (otp) {
    mailOptions = {
      from: "jaminjamts12@gmail.com",
      to: to,
      subject: "Говь Айгар вебсайт",
      html: `<p>Таны нэг удаагийн нууц үг <strong>${otp}</strong>.Энэ нь 5 минут хүчинтэй.</p>`,
    };
  }

  if (!otp) {
    mailOptions = {
      from: "jaminjamts12@gmail.com",
      to: to,
      subject: "Говь Айгар вебсайт",
      html: `<h1>Говь Айгар вебсайтад тавтай морил</h1>`,
    };
  }

  return transporter.sendMail(mailOptions);
}
async function sendCollabrationEmail(purpose, email, firstname, plan) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jaminjamts12@gmail.com",
      pass: "scpb ckkd gmfa krnj",
    },
  });

  const mailOptions = {
    from: "jaminjamts12@gmail.com",
    to: "ceo@gobiaigar.com",
    subject: `Говь Айгар вебсайтад ${purpose} санал хүрч ирлээ`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Санал ирлээ</h2>
        <p style="font-size: 16px; color: #555;"><strong>Илгээгчийн имэйл:</strong> ${email}</p>
        <p style="font-size: 16px; color: #555;"><strong>Нэр:</strong> ${firstname}</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
        <h3 style="color: #333;">Санал / Зорилго</h3>
        <p style="font-size: 16px; color: #444; line-height: 1.5;">${plan}</p>
        <div style="margin-top: 30px; text-align: center;">
          <small style="color: #999;">Говь Айгар вебсайт – автомат имэйл систем</small>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export { sendEmail, sendCollabrationEmail };
