import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { get } from 'http';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
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
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const Users = mongoose.model('users', new mongoose.Schema({
    user_id: Number,
    profile_pic: String,
    fullname: String,
    email: String,
    phone_number: Number,
    Address:[{
        street_line1: String,
        street_line2: String,
        city: String,
        state: String,
        country: String,
        ZIP_Number: Number
    }],
    user_name: String,
    password: String,
    role: String,
    first_vist: Boolean,
    active: Boolean,
    status: String,
    delete_request: String,
}));

app.post('/register', async (req, res) => {
    try {
        const {user_id, profile_pic, fullname, email, phone_number, Address, user_name, role, first_vist, active, status, delete_request } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const user = new Users({user_id, profile_pic, fullname, email, phone_number, Address, user_name, password, role, first_vist, active, status, delete_request });
        await user.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        console.error('Error in /register:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/user_ids', async (req, res) => {
    try {
        const users = await Users.find({}, { user_id: 1, _id: 0 });
        res.status(200).send(users);
    } catch (error) {
        console.error('Error in /user_ids:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/usernames', async (req, res) => {
    try {
        const users = await Users.find({}, { user_name: 1, _id: 0 });
        res.status(200).send(users);
    } catch (error) {
        console.error('Error in /user_ids:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/userdata', async (req, res) => {
    const { user_id } = req.body;
    try {
        const user = await Users.findOne({ user_id }, { _id: 0, password: 0 });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error in /userdata:', error);
        res.status(500).send('Internal server error');
    }
});




{ /*Error occuring API*/}
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        console.log('Password:', password);
        console.log('User password', user.password);
          
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log(isMatch);
                res.status(401).send("Invalid email or password");
                return;
            }
            const token = jwt.sign(user.toObject(), process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            console.log('Token:', token);
            res.cookie('DewTeatoken', token, { httpOnly: true });
            res.status(200).send('Login successful');
        } catch (error) {
            console.error('Error comparing passwords:', error);
            res.status(500).send('Authentication error');
        }
    } catch (error) {
        console.error('Error in /login:', error); 
    }

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


app.listen(3001, () => console.log('Server Running on Port 3001'));