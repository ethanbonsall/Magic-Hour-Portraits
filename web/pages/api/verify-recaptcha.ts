/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { token } = req.body;

        if (!token || typeof token !== "string") {
            return res.status(400).json({ success: false, message: "Missing or invalid token" });
        }

        const secret = process.env.RECAPTCHA_SECRET_KEY;
        if (!secret) {
            return res.status(500).json({ success: false, message: "Server misconfiguration" });
        }

        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ success: false, message: "reCAPTCHA verification failed" });
    }
}
