import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js"
import hotelRouter from "./routes/hotel.js"
import userRouter from "./routes/user.js"
import roomRouter from "./routes/room.js"
import cookieParser from 'cookie-parser'
import { AppError } from "./utils/error.js";

const app = express();
dotenv.config();

const connect = async () => {

    try {
         mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true});
    }

    catch (err) {
        throw err ;
    }

}

mongoose.connection.on("connected" , () => {
    console.log("mongodb connected ");
})

mongoose.connection.on("disconnected" , () => {
    console.log("mongodb disconnected")
})

// middlewares
app.use(express.json());
app.use(cookieParser());




app.use('/auth' , authRouter);
app.use('/hotel' , hotelRouter);
app.use('/user' , userRouter);
app.use('/room' , roomRouter);

app.listen(8080 , () => {

    console.log("welcome to booking app.");
    connect();

})


app.use('*' , ( req , res , next )=> {
    return next(AppError("this url " + req.baseUrl + " is not valid"))
})

app.use(( err , req , res , next ) => {
    const errorStatus = err.status || 500 ;
    const errorMessage = err.message || "something went wrong " ;

    return res.status(errorStatus).json({
        success : false ,
        status : errorStatus,
        message : errorMessage ,
        stack : err.stack ,
    })
})

