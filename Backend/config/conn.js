import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB =  (req,res) => {
    try{
        const options = {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            connectTimeoutMS: 3000000,  // 3000 seconds
            socketTimeoutMS: 4500000,   // 4500 seconds
        };

        const conn = mongoose.connect(process.env.MONGODB_URI,options);
        console.log(`MongoDB Connected to ${process.env.MONGODB_URI}`);
    }catch(err){
        console.log(err);
    }
    
}

export default connectDB;