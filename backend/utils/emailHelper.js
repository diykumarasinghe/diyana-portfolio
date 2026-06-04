const nodemailer = require('nodemailer');

/**
 * Sends a contact form notification email to the admin.
 * @param {Object} contactDetails
 * @param {string} contactDetails.name - Name of the sender
 * @param {string} contactDetails.email - Email of the sender
 * @param {string} contactDetails.message - Message body
 * @param {Date|string} [contactDetails.timestamp] - Optional timestamp of the message
 */
const sendContactEmail = async (contactDetails) => {
  const { name, email, message, timestamp } = contactDetails;
  
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailReceiver = process.env.EMAIL_RECEIVER || process.env.ADMIN_EMAIL;

  if (!emailUser || !emailPass) {
    throw new Error('EMAIL_USER or EMAIL_PASS environment variables are not set.');
  }

  if (!emailReceiver) {
    throw new Error('Neither EMAIL_RECEIVER nor ADMIN_EMAIL is configured.');
  }

  // Create transporter configuration for Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const formattedDate = timestamp 
    ? new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Colombo', timeZoneName: 'short' })
    : new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo', timeZoneName: 'short' });

  // Modern HTML Email Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Submission</title>
      <style>
        body {
          font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #0f172a;
          color: #f8fafc;
          margin: 0;
          padding: 20px;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #1e293b;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
          border: 1px solid #334155;
        }
        .header {
          background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
          color: #ffffff;
          padding: 30px 20px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 14px;
          color: #e2e8f0;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin-bottom: 6px;
        }
        .value {
          font-size: 16px;
          color: #f1f5f9;
        }
        .value a {
          color: #818cf8;
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .message-box {
          background-color: #0f172a;
          border-left: 4px solid #6366f1;
          padding: 16px;
          border-radius: 8px;
          margin-top: 24px;
        }
        .message-text {
          color: #e2e8f0;
          white-space: pre-wrap;
          line-height: 1.6;
          margin: 0;
          font-size: 15px;
        }
        .footer {
          background-color: #111827;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #64748b;
          border-top: 1px solid #334155;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Message</h2>
          <p>Portfolio Contact Form Submission</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Sender Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Sender Email</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="label">Timestamp</div>
            <div class="value">${formattedDate}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">
              <pre class="message-text">${message}</pre>
            </div>
          </div>
        </div>
        <div class="footer">
          This notification was generated automatically by the Diyana Portfolio contact system.
        </div>
      </div>
    </body>
    </html>
  `;

  // Text fallback body
  const textContent = `
New Contact Message Received!

Sender Name: ${name}
Sender Email: ${email}
Timestamp: ${formattedDate}

Message:
${message}

---
Sent via Portfolio Contact Form.
  `.trim();

  // Send mail options
  const mailOptions = {
    from: `"${name}" <${emailUser}>`,
    to: emailReceiver,
    subject: `New Portfolio Message from ${name}`,
    text: textContent,
    html: htmlContent,
    replyTo: email
  };

  // Deliver email
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactEmail
};
