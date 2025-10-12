import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const {
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_SENDER_EMAIL,
} = process.env;

const transport = nodemailer.createTransport({
  host: MAIL_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(MAIL_PORT) || 465,
  secure: MAIL_SECURE === "true",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

export const mailer = async (
  to: string,
  subject: string,
  text?: string,
  html?: string
): Promise<any | void> => {
  try {
    const info = await transport.sendMail({
      from: MAIL_SENDER_EMAIL,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    return {
      sent: true,
      message: "Email sent successfully",
      info: info,
    };
  } catch (error) {
    return {
      sent: false,
      message: "Error sending email",
      error: error,
    };
  }
};
