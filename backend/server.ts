import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import mongoose from 'mongoose';


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});