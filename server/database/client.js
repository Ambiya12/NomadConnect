import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI, {
        });

        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed', error);
    }
}

export default connectDB;