import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config()

const connectDB=async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL)
        console.log(`database is connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting to the database ${error.message}`);
        process.exit(1)
        
    }
}
export default connectDB;