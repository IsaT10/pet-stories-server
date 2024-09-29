import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: config.nodemailer_host,
    port: Number(config.nodemailer_port),
    secure: config.node_env === 'production',
    auth: {
      user: config.auth_user,
      pass: config.auth_pass,
    },
  });

  await transporter.sendMail({
    from: config.send_email, // sender address
    to, // list of receivers
    subject: ' Your password reset token ', // Subject line
    text: 'Change password within 10 min', // plain text body
    html, // html body
  });
};
