import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/users.js"
import VideoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import CommentRoutes from "./routes/comments.js"

import cors from "cors"


//middlwares
const app = express();
app.use(cookieParser());
app.use(express.json({extended:true}))
app.use(cors(
    {
        credentials:true,
    origin:"http://localhost:5173",
    }
));

dotenv.config();
app.use("/api/users",UserRoutes);
app.use("/api/videos",VideoRoutes);
app.use("/api/auth",authRoutes)
app.use("/api/comments",CommentRoutes);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use((err,req,res,next)=>{
    const status = err.status ||500;
    const message = err.message||"something went wrong";
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })
})



mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        console.log("Connected to db succesfully ");
        app.listen(8800,()=>{
            console.log("Conncected !");
        })
    }
).catch((err)=>{
    console.log(err.message)

});



