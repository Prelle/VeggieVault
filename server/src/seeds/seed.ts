import db from '../config/connection.js';
import { User, Plant } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
import plantData from './plantData.json' with { type: 'json'};

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await User.create(userData);
    await Plant.create(plantData);

    // TODO: Populate seed boxes for each user



    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
