import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected!!");
})
.catch((err) => {
    console.log(err);
})

const app = express();

app.listen(3002, () => {
    console.log('Sever is running on port 3002!');
});

app.use('/api/user', userRouter);   