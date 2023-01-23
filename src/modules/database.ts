import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

// Define a new prisma client
export const prismaDBClient = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
}); // Viewing all kinds of logs in development

// generate random nano id
export const generateNanoID = () => nanoid(16);

// Define seeding database function and immeditedly invoking it
const seedDatabase = async () => {
  if ((await prismaDBClient.submission.count()) === 0) {
    await prismaDBClient.submission.createMany({
      data: [
        {
          id: generateNanoID(),
          submittedAt: new Date(),
          data: {
            name: 'Kevin wade',
            facebook: 'keviiiiiin',
          },
        },
      ],
    });
  }
};
seedDatabase();
