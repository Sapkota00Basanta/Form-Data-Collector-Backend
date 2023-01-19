import { PrismaClient } from '@prisma/client';
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';

// Define a new prisma client
const prismaDBClient = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
}); // Viewing all kinds of logs in development

// generate random nano id
const generateNanoID = () => nanoid(16);

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
// Define an express server application
const app = express();

// Use morgan as default logger for server
app.use(morgan('dev'));

// Demo RESTAPI endpoint setup
app.get('/', async (req, res) => {
  const posts = await prismaDBClient.submission.findMany();
  res.json(posts);
});

// Start the server & listen on specified port
const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
