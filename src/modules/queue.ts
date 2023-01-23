// This modules handles the connection with redis server and assign an worker thread
import { Queue, Worker } from 'bullmq';
import ModGenerate from './generate';

// Environment varaiable data passed as a constant
const QUEUE_NAME = 'default';

// Fetching data from docker pass environment
if (!process.env.REDIS_HOST)
  console.warn('REDIS_HOST environment value is null');

const connection = {
  host: process.env.REDIS_HOST,
};

// Define a queue connection with redis
const queueServer = new Queue(QUEUE_NAME, { connection });

// Create a worker thread based to handle the queuing job
const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (job.name === 'generateSubmisson') {
      const submission = await ModGenerate.submission();
    }
  },
  { connection }
);

type jobName = 'generateSubmisson';

// Create a function to create a new queue
export const enqueue = async (job: jobName, data?: any) => {
  await queueServer.add(job, data);
};
