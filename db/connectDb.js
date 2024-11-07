import mongoose from "mongoose";
import colors from 'colors';
import * as dotenv from 'dotenv'

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected to MongoDB ${mongoose.connection.host}`.bgGreen.black);
	} catch (error) {
		console.log("Error connecting to MongoDB".bgRed, error.message);
	}
};

export default connectDb;