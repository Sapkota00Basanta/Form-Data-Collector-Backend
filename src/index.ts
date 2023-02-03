import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { resolvers } from './graphql/resolvers';
import { prismaDBClient } from './modules/database';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { readFileSync } from 'fs';

// Define an express server application
const app = express();

// Reading the graphql schema file to pass on types while creating server
const graphqlSchema = readFileSync('./src/graphql/schema.graphql', 'utf-8');

// Defining an interfacet for apollo sever
interface MyContext {
  token?: string;
}

// Demo RESTAPI endpoint setup
app.get('/', async (req, res) => {
  const posts = await prismaDBClient.submission.findMany();
  res.json(posts);
});

// Initialized an apollo graphql server
export const startServer = async () => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs: graphqlSchema,
    resolvers: resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    morgan('dev'),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  const port = Number(process.env.PORT ?? 8080);
  await new Promise<void>((resolve) =>
    httpServer.listen({ host: '0.0.0.0', port }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

startServer();
