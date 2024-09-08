const mongoose = require('mongoose');

// password is Bhurji@123 but it take herere Bhurji%40123
const url = 'mongodb+srv://ab_mock_test:Bhurji%40123@clustermocktest.0q6ax.mongodb.net/mock_test'
const connectToDatabase = async () => {
 try {
  await mongoose.connect(url);
  console.log('Connected to MongoDB');
  mongoose.connection.on('error', (error: any) => {
   console.error('MongoDB connection error:', error);
  });
  mongoose.connection.on('disconnected', () => {
   console.log('Disconnected from MongoDB');
  });
  process.on('SIGINT', async () => {
   await mongoose.connection.close();
   console.log('Mongoose connection is disconnected due to application termination');
   process.exit(0);
  });
 } catch (error) {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
 }
};

connectToDatabase();
export default mongoose.connection;
