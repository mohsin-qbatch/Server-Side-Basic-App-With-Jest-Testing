import Users from '../../models/users';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

/**
 * GET /account/verify
 * Verify email address
 */

const verifyEmail = (req, res, next) => {
  const { email } = req.params;
  const token = crypto.randomBytes(20).toString('hex');

  Users.findOne({ email })
      .then((user) => {
        user.emailVerificationToken = token;
        user.save();
      });

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 25,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    to: email,
    from: 'no-reply@promoapp.com',
    subject: 'Please verify your email address for Promo Application',
    text: `Thank you for registering with promo-app.\n\n
      This verify your email address please click on the following link, or paste this into your browser:\n\n
      http://${req.headers.host}/account/verify/${token}\n\n
      \n\n
      Thank you!`
  };

  transporter.sendMail(mailOptions)
      .then(() => {
        req.flash('info', { msg: `An e-mail has been sent to ${email} with further instructions.` });
      })
      .catch((err) => {
        req.flash('errors', { msg: 'Error sending the email verification message. Please try again shortly.' });
        return err;
      });
};
