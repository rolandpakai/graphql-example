import http from 'http';
import url from 'url';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
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

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = express();
//app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Listening on port', PORT)
});