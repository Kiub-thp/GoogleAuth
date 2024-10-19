import express from 'express';

const app = express();

app.listen(3002, () => {
    console.log('Sever is running on port 3002!');
});