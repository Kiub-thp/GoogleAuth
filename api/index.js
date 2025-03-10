import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import adminRoute from './routes/admin.route.js';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected!!");
})
.catch((err) => {
    console.log(err);
})

const app = express();
const __dirname = path.resolve();
app.listen(3002, () => {
    console.log('Sever is running on port 3002!');
});
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);   
app.use('/api/auth', authRouter);
app.use("/api/admin",adminRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});