import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: config.nodemailer_host,
    port: 587,
    secure: false,
    auth: {
      user: config.auth_user,
      pass: config.auth_pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: config.send_email, // sender address
      to, // list of receivers
      subject: 'Your password reset token', // Subject line
      text: 'Change your password within 10 minutes', // Plain text body
      html, // HTML body
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
