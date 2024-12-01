import mongoose from "mongoose";

export const connectMongoDB = async () => {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection; // Return existing connection
    }

    try {
        // Connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB"); // Re-throw error for further handling
    }
};