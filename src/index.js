import express from 'express';
import connectdb from './db';
import userroutes from './routes/user.routes';
import dotenv from "dotenv";
import app from "app.js"
connectdb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.error("Failed to connect to database:", error);
    process.exit(1);
});
