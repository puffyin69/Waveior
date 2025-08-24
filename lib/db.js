import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    // If already connected, don't reconnect
    if (isConnected) {
        console.log("✅ Already connected to MongoDB");
        return;
    }

    // Check if MongoDB URI is provided
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("❌ MONGODB_URI environment variable is not defined");
        throw new Error("Database URI is required");
    }

    try {
        // ✅ Clean connection without deprecated options
        const db = await mongoose.connect(uri);

        isConnected = db.connections[0].readyState === 1;
        console.log("🚀 MongoDB connected successfully");
        console.log(`📡 Connected to: ${db.connection.name}`);
        
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        isConnected = false;
        throw err;
    }
};

// ✅ Improved connection event handlers
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB');
    isConnected = true;
});

mongoose.connection.on('error', (err) => {
    console.error('💥 Mongoose connection error:', err);
    isConnected = false;
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
    isConnected = false;
});

// ✅ Graceful shutdown
if (typeof process !== 'undefined') {
    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            console.log('🛑 MongoDB connection closed through app termination');
            process.exit(0);
        } catch (error) {
            console.error('❌ Error during graceful shutdown:', error);
            process.exit(1);
        }
    });
}

export default connectDB;