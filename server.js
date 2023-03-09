import http from 'http';
import url from 'url';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
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

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log('Listening on port', PORT)
  });
};

startApolloServer();