import mongoose from 'mongoose';
import colors from "colors";

const connectDB = async ()=>{
    try {
        const connectionInstance =await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected !! DB HOST ${mongoose.connection.host}`.bgMagenta.white);

    }catch (err){
        console.log('MONGO ERROR',err);
        process.exit(1);
    }
}

export default connectDB;