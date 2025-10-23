const nodemailer = require('nodemailer');
const config = require('../utils/config');
const logger = require('../utils/logger');

let transporter = null;

const initializeTransporter = () => {
  if (!config.email.host || !config.email.user || !config.email.password) {
    logger.warn('Email configuration incomplete, email service disabled');
    return null;
  }

  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });
};

const sendWelcomeEmail = async (email, userName) => {
  if (!transporter) {
    transporter = initializeTransporter();
  }

  if (!transporter) {
    logger.warn('Email service not configured, skipping welcome email');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: `"TT Breathwork Toolkit" <${config.email.user}>`,
      to: email,
      subject: 'Welcome to TT Breathwork Instructor Toolkit',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0B2545;">Welcome, ${userName}!</h1>
          <p>Thank you for claiming your TT Breathwork Instructor Toolkit access.</p>
          <p>You now have access to:</p>
          <ul>
            <li>19 professionally designed templates</li>
            <li>Brand wizard for personalization</li>
            <li>90-day launch plan</li>
            <li>Unlimited PDF downloads</li>
          </ul>
          <p>Get started by completing your brand wizard at:</p>
          <a href="${config.frontend.url}" style="display: inline-block; padding: 12px 24px; background-color: #0B2545; color: white; text-decoration: none; border-radius: 4px;">
            Access Your Toolkit
          </a>
          <p style="margin-top: 32px; color: #6B7280; font-size: 14px;">
            Questions? Contact us at support@timvandervliet.com
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Welcome email sent:', { email, messageId: info.messageId });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending welcome email:', { error: error.message, email });
    return { success: false, error: error.message };
  }
};

const sendCodeEmail = async (email, code) => {
  if (!transporter) {
    transporter = initializeTransporter();
  }

  if (!transporter) {
    logger.warn('Email service not configured, skipping code email');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: `"TT Breathwork Toolkit" <${config.email.user}>`,
      to: email,
      subject: 'Your TT Breathwork Toolkit Access Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0B2545;">Your Access Code</h1>
          <p>Here's your access code for the TT Breathwork Instructor Toolkit:</p>
          <div style="background-color: #F9FAFB; padding: 24px; border-radius: 8px; text-align: center; margin: 24px 0;">
            <code style="font-size: 24px; font-weight: bold; color: #0B2545; letter-spacing: 2px;">${code}</code>
          </div>
          <p>Use this code to access your toolkit at:</p>
          <a href="${config.frontend.url}" style="display: inline-block; padding: 12px 24px; background-color: #0B2545; color: white; text-decoration: none; border-radius: 4px;">
            Access Your Toolkit
          </a>
          <p style="margin-top: 32px; color: #6B7280; font-size: 14px;">
            This code is unique to you. Please keep it secure.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Code email sent:', { email, messageId: info.messageId });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending code email:', { error: error.message, email });
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCodeEmail
};
