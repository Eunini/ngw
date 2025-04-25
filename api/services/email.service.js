const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const sendEmail = async (options) => {
  try {
    let transporter;

    // Use mock transport in development if no email config is present
    if (
      process.env.NODE_ENV === 'development' &&
      (!process.env.EMAIL_HOST || !process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD)
    ) {
      console.log('--- Mock Email Sending ---');
      console.log(`To: ${options.email}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Message: ${options.message}`);
      console.log('---------------------------');
      return;
    }

    // Local or custom SMTP config
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // For production with SendGrid
    if (process.env.NODE_ENV === 'production') {
      transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_API_KEY
        }
      });
    }

    // Define email options
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.error(`Error sending email: ${err.message}`);
    throw new Error('There was an error sending the email. Try again later!');
  }
};

module.exports = sendEmail;
