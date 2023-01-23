import { faker } from '@faker-js/faker';
import { random } from 'lodash';
import { generateNanoID, prismaDBClient } from './database';

const submission = async () => {
  return await prismaDBClient.submission.create({
    data: {
      id: generateNanoID(),
      submittedAt: new Date(),
      data: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        company: faker.company.catchPhrase(),
        comments: faker.lorem.words(random(30, false)),
      },
    },
  });
};

const ModGenerate = {
  submission,
};

export default ModGenerate;
