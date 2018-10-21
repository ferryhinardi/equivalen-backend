import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import reindexOrder from 'modules/order/controllers/reindexOrder';
import reindexXenditInvoice from 'modules/order/controllers/reindexXenditInvoice';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';
import schemaDirectives from './directives';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
  introspection: true,
  playground: true
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

/* =============================== */
// Route API
/* =============================== */
app.get('/api/v1/orders/:id/reindex', reindexOrder);
app.post('/api/v1/orderXenditInvoices/reindex', bodyParser.json(), reindexXenditInvoice);

server.applyMiddleware({
  app,
  path: '/'
});

export default app;
