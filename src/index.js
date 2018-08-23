import server from './server';
import models from './models';

/**
 * DISCLAIMER: using sequelize#sync is not recommended for production use. Please, please
 * use migrations. This method of creating a database is used in this demo for simplicity's sake.
 */
async function start() {
  // Start the GraphQL server
  models.sequelize.sync().then(() => {
    server.start(() => {
      console.log('Server is running on localhost:4000');
    });
  });
}

start();
