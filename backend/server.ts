import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import connectDB from './connection/connectDb';
import { GoogleGenerativeAI } from '@google/generative-ai';


dotenv.config();
connectDB();
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/students', authRoutes);

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.use('/chat', async (req, res) => {
    const {prompt} = req.body;
    try{
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        res.json({response : responseText});
    }
    catch(err){
        console.error(err);
        res.status(500).json({response : "Error fetching response"});
    }
}
);
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});