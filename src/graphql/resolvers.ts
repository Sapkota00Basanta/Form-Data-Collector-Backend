import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import { times } from 'lodash';
import { prismaDBClient } from '../modules/database';
import { enqueue } from '../modules/queue';

export const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,

  Query: {
    submissions: () => {
      return prismaDBClient.submission.findMany({
        orderBy: { submittedAt: 'desc' },
      });
    },
  },
  Mutation: {
    queueSubmissionGeneration: async (_, { count }: { count: number }) => {
      await Promise.all(
        times(count ?? 1).map(async () => {
          await enqueue('generateSubmisson');
        })
      );
      return true;
    },
  },
};
