import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
// ES modules fix for __dirname

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getEmailTemplate() {
    try {
        const templatePath = path.join(__dirname, 'templates', 'emailTemplate.html');

        const template = await fs.readFile(templatePath, 'utf8');
        return template;
    } catch (error) {
        console.error('Error reading email template:', error);
        throw error;
    }
}
const port = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
    service: process.env.MY_SERVICE_PROVIDER,
    auth: {
        user: process.env.MY_EMAIL_ADDRESS,
        pass: process.env.MY_PASSWORD
    }
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is ready');
});







app.post('/sendemail', async (req, res) => {
    try {
        const { otp, email } = req.body;
        
        // Get the email template
        let emailTemplate = await getEmailTemplate();
        
        // Replace placeholders with actual content
        emailTemplate = emailTemplate.replace('${otp}', otp);

        const mailOptions = {
            from: process.env.MY_EMAIL_ADDRESS,
            to: email,
            subject: 'OTP for password reset',
            html: emailTemplate
        };

        // Convert callback to promise
        try {
            const info = await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                });
            });
            res.status(200).send('Email sent: ' + info.response);
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send(error.message);
        }
    } catch (error) {
        console.error('Error in /sendemail:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});