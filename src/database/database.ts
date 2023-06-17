import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URL || "";

mongoose.connect(connectionString, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
