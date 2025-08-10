import dotenv from "dotenv";
dotenv.config();

import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASSWORD,
    },
});

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res
                .status(400)
                .json({ error: "Name, email, and message are required" });
        }

        const mailOptions = {
            from: process.env.OUTLOOK_EMAIL,
            to: process.env.OUTLOOK_EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Email sent successfully", success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
