import dotenv from 'dotenv';
import connectDB from './connection/connectDb';
import Teacher from './model/teacherModel';
import tutorsJson from './data/teachers_metro.json';

dotenv.config();

const start = async (): Promise<void> => {
  try {
    await connectDB();
    await Teacher.create(tutorsJson);
    console.log('Data successfully inserted');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    process.exit();
  }
};

start();
