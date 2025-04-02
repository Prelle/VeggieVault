import { User, Plant, SeedBox } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    await SeedBox.deleteMany({});
    await Plant.deleteMany({});
    await User.deleteMany({});
    console.log('Collections cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
