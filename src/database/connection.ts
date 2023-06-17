import mongoose from 'mongoose';

// Replace 'mongodb://localhost:27017/drones' with your MongoDB connection string
const connectionString = 'mongodb://localhost:27017/drones';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
