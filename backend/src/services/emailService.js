import nodemailer from 'nodemailer';

// Configure Nodemailer Transport using Gmail SMTP with App Password & TLS bypass for local network certs
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL || 'tatukulaedukondalu@gmail.com',
    pass: process.env.SMTP_APP_PASSWORD || 'rheo vxfk ansz twux'
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Send OTP Email for Password Reset
 * @param {string} recipientEmail 
 * @param {string} otpCode 
 */
export const sendOtpEmail = async (recipientEmail, otpCode) => {
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 550px; margin: 0 auto; background-color: #0d1117; color: #f0f6fc; border-radius: 12px; padding: 24px; border: 1px solid #30363d;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #30363d;">
        <h1 style="color: #ba0c2f; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 1px;">SWITCHES</h1>
        <p style="color: #8b949e; margin: 4px 0 0 0; font-size: 12px; font-weight: 700;">PREMIUM MODERN E-COMMERCE</p>
      </div>

      <div style="padding: 24px 0;">
        <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #ffffff;">Password Reset Request</h2>
        <p style="color: #c9d1d9; font-size: 14px; line-height: 1.6;">
          You requested to reset your password for your <strong>SWITCHES</strong> account. Use the 6-digit verification code below to complete your password reset:
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <div style="display: inline-block; background: linear-gradient(135deg, #ba0c2f, #990000); color: #ffffff; font-size: 32px; font-weight: 900; letter-spacing: 8px; padding: 14px 28px; border-radius: 8px; box-shadow: 0 4px 14px rgba(186, 12, 47, 0.4);">
            ${otpCode}
          </div>
          <p style="color: #8b949e; font-size: 12px; margin-top: 10px;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
        </div>

        <p style="color: #8b949e; font-size: 13px; line-height: 1.5;">
          If you did not request a password reset, please ignore this email or contact support if you have security concerns.
        </p>
      </div>

      <div style="border-top: 1px solid #30363d; padding-top: 16px; text-align: center; font-size: 12px; color: #8b949e;">
        &copy; ${new Date().getFullYear()} SWITCHES Official Inc. All rights reserved.
      </div>
    </div>
  `;

  const mailOptions = {
    from: '"SWITCHES Security" <tatukulaedukondalu@gmail.com>',
    to: recipientEmail,
    subject: `🔐 ${otpCode} is your SWITCHES Password Reset Code`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] OTP Email sent successfully to ${recipientEmail}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EmailService] Error sending email to ${recipientEmail}:`, error);
    throw error;
  }
};
