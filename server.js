require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("Server is running but Nodemailer connection error: ", error);
        console.log("Please make sure you have generated a Gmail App Password and put it in the .env file.");
    } else {
        console.log("Server is ready to send messages via Nodemailer!");
    }
});

// API endpoint for contact logic
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    try {
        // Mail options
        const mailOptions = {
            from: `"${name}" <${email}>`, // Note: Gmail usually overrides the "From" address with your own, but Reply-To helps
            replyTo: email,
            to: process.env.EMAIL_USER, // Send to yourself (bisnis.opal1673@gmail.com)
            subject: `New Portfolio Message from ${name}`,
            text: `You received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New message from Portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send mail
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email successfully sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Fallback to index.html for any other requests (SPA routine)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
