/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, phone, optOutOptions, additionalInfo } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    // SMTP configuration - all values from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.SMTP_RECIPIENT_EMAIL || smtpUser;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      return res.status(500).json({ 
        success: false, 
        message: "SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables." 
      });
    }
    
    const smtpConfig: any = {
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465,
      requireTLS: parseInt(smtpPort) === 587,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
    };

    const transporter = nodemailer.createTransport(smtpConfig);

    // Build the opt-out message
    const selectedOptions = [];
    if (optOutOptions.all) selectedOptions.push("All Communications");
    if (optOutOptions.marketing) selectedOptions.push("Marketing Communications");
    if (optOutOptions.newsletters) selectedOptions.push("Newsletters and Updates");
    if (optOutOptions.promotional) selectedOptions.push("Promotional Emails and Offers");
    if (optOutOptions.dataSharing) selectedOptions.push("Data Sharing with Third Parties");

    const emailBody = `
OPT-OUT REQUEST FROM MAGIC HOUR PORTRAITS WEBSITE

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Opt-Out Selections:
${selectedOptions.length > 0 ? selectedOptions.map((opt) => `✓ ${opt}`).join("\n") : "None selected"}

Additional Information:
${additionalInfo || "None provided"}

---
This is an automated opt-out request. Please process within 10 business days.
Submitted on: ${new Date().toLocaleString("en-US", {
  timeZone: "America/New_York",
  dateStyle: "full",
  timeStyle: "long",
})}
    `.trim();

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
          OPT-OUT REQUEST FROM MAGIC HOUR PORTRAITS WEBSITE
        </h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Contact Information:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Opt-Out Selections:</h3>
          <ul>
            ${selectedOptions.length > 0 
              ? selectedOptions.map((opt) => `<li>✓ ${opt}</li>`).join("")
              : "<li>None selected</li>"
            }
          </ul>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Additional Information:</h3>
          <p>${additionalInfo || "None provided"}</p>
        </div>
        
        <hr style="border: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated opt-out request. Please process within 10 business days.<br>
          Submitted on: ${new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
            dateStyle: "full",
            timeStyle: "long",
          })}
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"Magic Hour Portraits Website" <${smtpUser}>`,
      to: recipientEmail,
      subject: "Opt-Out Request - Magic Hour Portraits",
      text: emailBody,
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Opt-Out Request Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Magic Hour Portraits. We have received your opt-out request and will process it within 10 business days.</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <h3 style="color: #555; margin-top: 0;">Your Request Summary:</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Opt-Out Options:</strong></p>
          <ul>
            ${selectedOptions.length > 0 
              ? selectedOptions.map((opt) => `<li>${opt}</li>`).join("")
              : "<li>None selected</li>"
            }
          </ul>
        </div>
        
        <p>If you have any questions or need to modify your request, please contact us at <Link href="mailto:${recipientEmail}">${recipientEmail}</Link>.</p>
        
        <p>Best regards,<br>Magic Hour Portraits</p>
        
        <hr style="border: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          This is an automated confirmation email. Please do not reply to this message.
        </p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"Magic Hour Portraits" <${smtpUser}>`,
        to: email,
        subject: "Opt-Out Request Confirmation - Magic Hour Portraits",
        text: `Dear ${name},\n\nThank you for contacting Magic Hour Portraits. We have received your opt-out request and will process it within 10 business days.\n\nYour Request Summary:\nEmail: ${email}\nOpt-Out Options:\n${selectedOptions.join("\n")}\n\nIf you have any questions, please contact us at ${recipientEmail}.\n\nBest regards,\nMagic Hour Portraits`,
        html: confirmationHtml,
      });
    } catch (confirmationError) {
      // Don't fail the request if confirmation email fails
    }

    return res.status(200).json({ 
      success: true, 
      message: "Opt-out request sent successfully" 
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send opt-out request",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
}

