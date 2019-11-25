import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const setupDatabase = () => {
  mongoose.connect(process.env.MONGO_URL, options)
      .then(() => {
        console.info('INFO - MongoDB Database connected.');
      })
      .catch((error) => {
        console.error('ERROR - Unable to connect to the database:', error);
      });
};

export default setupDatabase;
