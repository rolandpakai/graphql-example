import http from 'http';
import url from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync, loadFiles  } from '@graphql-tools/load-files';
import path from 'path';
const __dirname = path.resolve();
 
const PORT = 3000;
 
const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql']
}); 

const resolversArray = await loadFiles(
  `${__dirname}/**/*.resolvers.js`,
  {
    ignoreIndex: true,
    requireMethod: async path => {
      return await import(url.pathToFileURL(path));
    },
  }
);

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  httpServer.listen(PORT, () => {
    console.log('Listening on port', PORT)
  });
};

startApolloServer();