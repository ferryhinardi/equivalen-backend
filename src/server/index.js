import { GraphQLServer } from 'graphql-yoga';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

export default server;