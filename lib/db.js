import mongoose from 'mongoose';
let isConnected = false;

const connectDB = async () => {
    // If already connected, don't reconnect
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    // Check if MongoDB URI is provided
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI environment variable is not defined");
        throw new Error("Database URI is required");
    }

    try {
        // Connect to MongoDB
        const db = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
        
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        throw err; // Re-throw to handle in calling code
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
    isConnected = false;
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
});

export default connectDB;