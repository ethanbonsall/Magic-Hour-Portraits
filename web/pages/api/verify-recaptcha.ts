// pages/api/verify-recaptcha.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: "Missing token" });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
        return res.status(500).json({ success: false, message: "Server misconfiguration: missing reCAPTCHA secret key." });
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    return res.status(200).json(data);
}
