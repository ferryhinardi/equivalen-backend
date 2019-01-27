import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import winston from 'winston';

import config from 'config/app';
import { showForgotPasswordForm, postForgotPassword } from 'modules/user/controllers/forgotPassword';
import reindexOrder from 'modules/order/controllers/reindexOrder';
import reindexXenditInvoice from 'modules/order/controllers/reindexXenditInvoice';
import { simulateCodeAK } from 'modules/user/controllers/simulateCodeAK';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './context';
import schemaDirectives from './directives';
import LoggingExtension from './logger';

const opts = {
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
  introspection: true,
  playground: process.env.NODE_ENV !== 'production',
  extensions: [() => new LoggingExtension(winston)]
};

if (process.env.NODE_ENV !== 'test') {
  opts.engine = { apiKey: config.ENGINE_API_KEY };
}

const server = new ApolloServer(opts);
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

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => res.sendStatus(200));
}

app.get('/health', (req, res) => res.sendStatus(200));
app.get('/forgot', showForgotPasswordForm);
app.post('/forgot', bodyParser.json(), bodyParser.urlencoded({ extended: true }), postForgotPassword);
app.get('/api/v1/orders/:id/reindex', reindexOrder);
app.post('/api/v1/orderXenditInvoices/reindex', bodyParser.json(), reindexXenditInvoice);
app.post('/api/v1/simulateCodeAK', bodyParser.json(), simulateCodeAK);

server.applyMiddleware({
  app,
  path: '/'
});

export default app;
