const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bootcamp';
const DB_OPTIONS = {
    serverSelectionTimeoutMS: 5000
};

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URI, DB_OPTIONS);
        console.log('✅ Connected to MongoDB successfully');

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Could not connect to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = connectToDatabase;

