import { GraphQLServer } from 'graphql-yoga';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';
import schemaDirectives from './directives';
import cors from 'cors';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives
});

server.express.use(
  cors({
    optionsSuccessStatus: 200
  })
);
server.express.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

export default server;
