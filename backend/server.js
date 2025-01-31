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
app.use(cors({
    origin: process.env.MY_ORIGIN || 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '50mb' }));
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


// Define schema
const Users = mongoose.model('users', new mongoose.Schema({
    user_id: String,
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
    action: String
}));

const Products = mongoose.model('products', new mongoose.Schema({
    product_id: Number,
    name: String,
    category: String,
    price: Number,
    stock: Number,
    status: String,
    image: String,
}));

const CartItems = mongoose.model('cartitems', new mongoose.Schema({
    user_id: Number,
    name: String,
    quantity: Number,
    price: Number,
    image: String,
}));

const PurchasedItems = mongoose.model('purchaseditems', new mongoose.Schema({
    user_id: String,
    products: [{
        product_name: String,
        quantity: Number,
        total_price: Number
    }],
    total_price: Number,
    date: String,
    invoice_num: String,
    status: String
}));

app.post('/editproduct', async (req, res) => {
    const { product_id, name, category, price, stock, status, image } = req.body;
    try {
        const product = await Products.updateOne({ product_id: product_id }, { $set: { name, category, price, stock, status, image } });
        res.status(200).send('Product updated successfully');
    } catch (error) {
        console.error('Error in /editproduct:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/viewproduct', async (req, res) => {
    const { product_id } = req.body;
    try {
        const product = await Products.findOne({ product_id }, { _id: 0 });
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        res.status(200).send(product);
    } catch (error) {
        console.error('Error in /viewproduct:', error);
        res.status(500).send('Internal server error');
    }
});

app.delete('/delproduct/:product_id', async (req, res) => {
    const {product_id} = req.params;
    try {
        const del = await Products.deleteOne({product_id : product_id});
        if(!del){
            res.status(404).send('Product not found');
            return;
        }
        res.status(200).send('Product deleted succecfully');
    } catch (error) {
        console.error("Error in /delproduct", error);
        res.status(500).send('Internal server error');
    }
});

app.post('/updateStatus', async (req, res) => {
    const {invoice_num, status} = req.body;
    try {
        const order = await PurchasedItems.updateOne({ invoice_num: invoice_num }, { $set: { status: status } });
        if (!order) {
            res.status(404).send('Order not found');
            return;
        }
        res.status(200).send('Status updated successfully');
    } catch (error) {
        console.error('Error in /updateStatus:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/updateAction', async (req, res) =>{
    const {user_id, action} = req.body;
    try {
        const order = await Users.updateOne({ user_id: user_id }, { $set: { action: action } });
        if (!order) {
            res.status(404).send('Order not found');
            return;
        }
        res.status(200).send('Action updated successfully');
    } catch (error) {
        console.error('Error in /updateStatus:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/lastorder', async (req, res) => {
    try {
        const responce = await PurchasedItems.aggregate([
            {$sort: { _id: -1 }},
            {$limit: 1},
            {$project: { _id: 0, user_id: 1, date: 1}}
        ]);
        res.status(200).send(responce);
    } catch (error) {
        console.error('Error in /lastorder:', error);
        res.status(500).send('Internal server error'); 
    }
})

app.get('/userStats', async (req, res) => {
    try {
        const userStats = await PurchasedItems.aggregate([
            {
                $group: {
                    _id: "$user_id", // Group by user_id
                    totalOrders: { $count: {} }, // Count the number of documents (orders) per user
                    totalSpent: { $sum: "$total_price" } // Sum the total_price field for each user
                }
            },
            {
                $project: {
                    _id: 0, 
                    user_id: "$_id", 
                    totalOrders: 1,
                    totalSpent: 1,
                }
            }
        ]);

        res.status(200).json(userStats); // Send the aggregated stats as the response
    } catch (error) {
        console.error('Error in /userStats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find().lean().sort({ _id: 1 });
        users.forEach(user => delete user.password);
        res.status(200).send(users);
    } catch (error) {
        console.error('Error in /users:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/allorders', async (req, res) => {
    try {
        const orders = await PurchasedItems.find().lean().sort({ _id: -1 });
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error in /allorders:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/count', async (req, res) => {
    try {
        const count = await Users.countDocuments();
        const countProducts = await Products.countDocuments();
        const countOrders = await PurchasedItems.countDocuments();
        const revenue = await PurchasedItems.aggregate([{ $group: { _id: null, total: { $sum: '$total_price' } } }]);
        res.status(200).send({ count, countProducts, countOrders, revenue: revenue[0].total });
    } catch (error) {
        console.error('Error in /usercount:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/orders', async (req, res) => {
    const { user_id } = req.body;
    try {
        const orders = await PurchasedItems.find({ user_id : user_id }).lean().sort({ _id: -1 });
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error in /orders:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/purchase', async (req, res) => {
    const { user_id, invoice_num, total } = req.body;
    try {
        const items = await CartItems.find({user_id : user_id }).lean();
        
        const purchase = new PurchasedItems({
            user_id : user_id,
            products: items.map(item => ({
                product_name: item.name,
                quantity: item.quantity,
                total_price: item.price
            })),
            total_price: total,
            date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
            invoice_num: invoice_num,
            status: 'Pending'
        });

        await purchase.save();
        res.status(200).send('Purchase successful');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: "Error adding purchases", message: err.message });
    }
});

app.delete('/removecartitems/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const cartItems = await CartItems.deleteMany({ user_id: user_id });
        if (!cartItems) {
            res.status(404).send('Items not found');
            return;
        }
        res.status(200).send('Items removed from cart successfully');
    } catch (error) {
        console.error('Error in /removecartitems:', error);
        res.status(500).send('Internal server error');
    }
});

app.delete('/removecartitem', async (req, res) => {
    const { product_id } = req.body;
    try {
        const cartItem = await CartItems.deleteOne({ product_id : product_id});
        if (!cartItem) {
            res.status(404).send('Item not found');
            return;
        }
        res.status(200).send('Item removed from cart successfully');
    } catch (error) {
        console.error('Error in /removecartitem:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/cart', async (req, res) => {
    const { user_id } = req.body;
    try {
        const cart = await CartItems.find({ user_id }, { _id: 0 });
        res.status(200).send(cart);
    } catch (error) {
        console.error('Error in /cart:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/updateproduct', async (req, res) => {
    try {
        const { product_id, stock, status} = req.body;
        const product = await Products.updateOne({ product_id: product_id }, { $set: { 
            stock: stock,
            status: status
        }});
        console.log(product);
        res.status(200).send('Product updated successfully');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.post('/addtocart', async (req, res) => {
    try {
        const { user_id, name, quantity, price, image } = req.body;
        const cartItem = new CartItems({ user_id, name, quantity, price, image });
        await cartItem.save();
        res.status(200).send('Item added to cart successfully');
    } catch (error) {
        console.error('Error in /addtocart:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/products', async (req, res)=>{
    try {
        const products = await Products.find({}, {_id: 0});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

app.post('/addproduct', async (req, res) => {
    const product_id = new Date().getTime()%10000000;
    try {
        const {name, category, price, stock, status, image } = req.body;
        const product = new Products({product_id, name, category, price, stock, status, image });
        await product.save();
        res.status(200).send('Product added successfully');
    } catch (error) {
        console.error('Error in /addproduct:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/changePassword', async (req, res) => {
    const {user_id, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.updateOne({ user_id }, { $set: { password: hashedPassword } });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send('Password updated successfully');
    } catch (error) {
        console.error('Error in /changePassword:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/updateaddress', async (req, res) => {
    try {
        const { user_id, street_line1, street_line2, city, state, country, ZIP_Number } = req.body;
        const responce = await Users.updateOne({ user_id: user_id }, {$set: { Address: {
            street_line1 : street_line1,
            street_line2 : street_line2,
            city : city,
            state : state,
            country : country,
            ZIP_Number : ZIP_Number
        }}});
        console.log(responce);
    
        if (!responce) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send('User updated sucessfully');
    } catch (error) {
        console.error('Error in /updateaddress:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/getaddress', async (req, res) => {
    const { user_id } = req.body;
    try {
        const user = await Users.findOne({ user_id: user_id }, { Address: 1, _id: 0 });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        console.error('Error in /getaddress:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/updateuser', async (req, res) => {
    try {
        const { user_id, email, fullname, first_vist, phone_number, profile_pic} = req.body;
        const responce = await Users.updateOne({ user_id: user_id }, {$set: {
            email : email,
            fullname : fullname,
            first_vist : first_vist,
            phone_number : phone_number,
            profile_pic : profile_pic
        } });
        console.log(responce);
    
        if (!responce) {
            res.status(404).send('User not found');
            return;
        }
        res.status(200).send('User updated sucessfully');
    } catch (error) {
        console.error('Error in /updateuser:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/userdata', async (req, res) => {
    const { user_id } = req.body;
    try {
        const user = await Users.findOne({ user_id }, {profile_pic:1, fullname: 1, email: 1, phone_number: 1, first_vist: 1, _id: 0 });
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

app.get('/emails', async (req, res) => {
    try {
        const users = await Users.find({}, { email: 1, _id: 0 });
        res.status(200).send(users);
    } catch (error) {
        console.error('Error in /user_ids:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/register', async (req, res) => {
    const numOne = Math.floor(10 + Math.random() * 90).toString();
    const numTwo = Math.floor(100 + Math.random() * 900).toString();
    const year = Math.floor((new Date().getFullYear())%100);
    const month = new Date().getMonth()+1;
    const date = new Date().getDate();
    const user_id = `UID-${month}${Math.floor((numOne*year)/date)}-${date}${Math.round(numTwo*month/year)}`;
    try {
        const {profile_pic, fullname, email, phone_number, Address, user_name, role, first_vist, active, status, delete_request, action } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        console.log('Password:',password);
        const user = new Users({user_id, profile_pic, fullname, email, phone_number, Address, user_name, password, role, first_vist, active, status, delete_request, action });
        await user.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        console.error('Error in /register:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        // Find user
        const user = await Users.findOne({ email : email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user){
            // Compare passwords - using async compare instead of compareSync
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Create token - remove sensitive info
        // const userObject = user.toObject();
        // delete userObject.password; // Remove password from token payload
        const token = jwt.sign({ user_id: user.user_id, role: user.role, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });
        console.log('Token generated successfully');
        
        // Set cookie with correct options
        res.cookie('DewTeatoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({ message: 'Login successful' });
        }

    } catch (error) {
        console.error('Error in /login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/checkauth', (req, res) => {
    const token = req.cookies.DewTeatoken;    
    
    if (!token) {
        return res.status(401).json({ message: 'No token found' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.json({ message: 'Valid token', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('DewTeatoken').send('Cookie cleared').status(200);
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

app.listen(3001, () => {
    console.log('Server Running on Port 3001')
});