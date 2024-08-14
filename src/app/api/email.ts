import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_APP_EMAIL,
    pass: process.env.NEXT_APP_PWD,
  },
});

export type ContactType = {
  otp: string;
  userEmail: string;
};

type MailOptionType = {
  to: string;
  subject: string;
  html: string;
};

export function sendEmail({ otp, userEmail }: ContactType) {
  const mailOptions: MailOptionType = {
    to: userEmail || "",
    subject: "[킬러조] 인증번호 발송",
    html: `
    		<h1>인증번호: ${otp}</h1>
    		`,
  };

  return transporter.sendMail(mailOptions);
}
