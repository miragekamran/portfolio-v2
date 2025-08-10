import nodemailer from "nodemailer";

const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res
            .status(400)
            .json({ error: "Name, email, and message are required" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email to you (the site owner)
    const mailOptionsToOwner = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // Auto-reply email to the user
    const mailOptionsAutoReply = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Thanks for contacting, ${name}!`,
        text: `Hi ${name},\n\nThank you for reaching out! I will get back to you as soon as possible.\n\nBest regards,\nMirage Kamran`,
    };

    try {
        await transporter.sendMail(mailOptionsToOwner); // Send message to you
        await transporter.sendMail(mailOptionsAutoReply); // Send auto-reply to user

        res.status(200).json({
            message: "Email sent successfully and auto-reply sent.",
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

export default sendEmail;
