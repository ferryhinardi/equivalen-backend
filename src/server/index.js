import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

const app = express();

app.use(
  cors({
    optionsSuccessStatus: 200
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.applyMiddleware({
  app,
  path: '/'
});

export default app;
