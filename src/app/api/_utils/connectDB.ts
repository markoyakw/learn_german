import mongoose from 'mongoose';

const DBPassword = "EDoanPBikJRv8jyz" //ADDD ENV
const uri = `mongodb+srv://yakovenkomarko:${DBPassword}@lernen.ffnsden.mongodb.net/?retryWrites=true&w=majority&appName=Lernen`;

const connectDB = async () => {
    console.log("connecting")
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB with Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('MongoDB connection failed');
    }
};

export default connectDB;