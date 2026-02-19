import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service configuration error:', error.message);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Send email to admin
export const sendEmailToAdmin = async (data) => {
  const mailOptions = {
    from: `"Bharani Scales" <${process.env.SENDGRID_FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission from ${data.name}`,
    replyTo: data.email,
    priority: 'high',
    headers: {
      'X-Mailer': 'Bharani Scales Contact Form',
      'X-Priority': '1',
      'Importance': 'high',
    },
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
        <div style="background-color: #fff; padding: 40px;">
          <div style="border-bottom: 3px solid #667eea; padding-bottom: 20px; margin-bottom: 30px;">
            <h2 style="color: #333; margin: 0; font-size: 24px; font-weight: 600;">New Contact Submission</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #666; font-weight: 500; border-bottom: 1px solid #e0e0e0;">Name:</td>
                <td style="padding: 12px 0 12px 20px; color: #333; font-weight: 600; border-bottom: 1px solid #e0e0e0;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #666; font-weight: 500; border-bottom: 1px solid #e0e0e0;">Email:</td>
                <td style="padding: 12px 0 12px 20px; color: #667eea; font-weight: 600; border-bottom: 1px solid #e0e0e0;">
                  <a href="mailto:${data.email}" style="text-decoration: none; color: #667eea;">${data.email}</a>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 12px 0; color: #666; font-weight: 500; border-bottom: 1px solid #e0e0e0;">Phone:</td>
                <td style="padding: 12px 0 12px 20px; color: #333; font-weight: 600; border-bottom: 1px solid #e0e0e0;">${data.phone}</td>
              </tr>
              ` : ''}
              ${data.subject ? `
              <tr>
                <td style="padding: 12px 0; color: #666; font-weight: 500;">Subject:</td>
                <td style="padding: 12px 0 12px 20px; color: #333; font-weight: 600;">${data.subject}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">Message:</h3>
            <div style="background: #fff; border-left: 4px solid #667eea; padding: 15px; border-radius: 4px; color: #555; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">
              ${data.message}
            </div>
          </div>

          <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; text-align: center; color: #666; font-size: 13px;">
            <p style="margin: 0;">Received on: <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</strong></p>
          </div>
        </div>

        <div style="background: #667eea; color: white; text-align: center; padding: 20px; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Bharani Scales. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log('📧 Sending admin email to:', process.env.ADMIN_EMAIL);
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Admin email sent successfully!');
    return result;
  } catch (error) {
    console.error('❌ Failed to send admin email:', error.message);
    throw error;
  }
};

// Send confirmation email to user
export const sendConfirmationToUser = async (data) => {
  const mailOptions = {
    from: `"Bharani Scales" <${process.env.SENDGRID_FROM_EMAIL}>`,
    to: data.email,
    subject: 'Thank You for Contacting Bharani Scales',
    replyTo: process.env.ADMIN_EMAIL,
    priority: 'high',
    headers: {
      'X-Mailer': 'Bharani Scales Contact Form',
      'X-Priority': '1',
      'Importance': 'high',
    },
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
        <div style="background-color: #fff; padding: 40px;">
          <div style="border-bottom: 3px solid #667eea; padding-bottom: 20px; margin-bottom: 30px;">
            <h2 style="color: #333; margin: 0; font-size: 24px; font-weight: 600;">Thank You for Reaching Out!</h2>
          </div>

          <div style="margin-bottom: 30px; color: #555; line-height: 1.8;">
            <p>Hi <strong>${data.name}</strong>,</p>
            <p>Thank you for contacting Bharani Scales. We have successfully received your message and will review it shortly.</p>
            <p>Our team typically responds within <strong>24-48 hours</strong>.</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Your Submission Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: 500; border-bottom: 1px solid #e0e0e0;">Subject:</td>
                <td style="padding: 10px 0 10px 20px; color: #333; font-weight: 600; border-bottom: 1px solid #e0e0e0;">${data.subject || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-weight: 500; vertical-align: top;">Message:</td>
                <td style="padding: 10px 0 10px 20px; color: #555; border-bottom: 1px solid #e0e0e0; white-space: pre-wrap; word-wrap: break-word;">${data.message.substring(0, 300)}${data.message.length > 300 ? '...' : ''}</td>
              </tr>
            </table>
          </div>

          <div style="background: #e8f3ff; padding: 15px; border-radius: 8px; color: #333; text-align: center; margin-bottom: 30px; border-left: 4px solid #667eea;">
            <p style="margin: 0; font-size: 14px; font-weight: 600;">We will be in touch soon!</p>
          </div>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 0;">If you have any questions, feel free to contact us:</p>
            <p style="margin: 10px 0 0 0;">
              <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #667eea; text-decoration: none; font-weight: 600;">Contact Us</a>
            </p>
          </div>
        </div>

        <div style="background: #667eea; color: white; text-align: center; padding: 20px; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Bharani Scales. All rights reserved.</p>
          <p style="margin: 8px 0 0 0;">This is an automated message from our contact form.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log('📧 Sending confirmation email to:', data.email);
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent successfully!');
    return result;
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error.message);
    throw error;
  }
};

export default transporter;
