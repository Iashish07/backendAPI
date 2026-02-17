import connectdb from './db';
import userroutes from './routes/user.routes';
import express from 'express';

const app = express();
app.use(express.json());

app.use("/api/user", userroutes);

