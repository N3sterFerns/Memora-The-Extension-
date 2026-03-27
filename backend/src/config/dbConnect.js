import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://videomedia:${process.env.MONGODB_PASS}@feelify.stugcgl.mongodb.net/memora`);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;