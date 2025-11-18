const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/airbnb';
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ MongoDB connected successfully');
        console.log(`📦 Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        // Don't crash the app, continue with MySQL
        console.log('⚠️  Continuing with MySQL database...');
    }
};

// MongoDB Session Schema
const sessionSchema = new mongoose.Schema({
    _id: String,
    expires: Date,
    session: String
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = { connectMongoDB, Session };
