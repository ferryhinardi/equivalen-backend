import sequelizeFixtures from 'sequelize-fixtures';
import fixtures from './fixtures';
import server from './server';
import models from './models';
import { config } from './config/app';

/**
 * DISCLAIMER: using sequelize#sync is not recommended for production use. Please, please
 * use migrations. This method of creating a database is used in this demo for simplicity's sake.
 */
const port = process.env.PORT || '4000';
async function start() {
  // can use glob syntax to select multiple files
  sequelizeFixtures.loadFixtures(fixtures, models).then(() => {
    // Start the GraphQL server
    models.sequelize.sync().then(() => {
      server.listen(
        {
          port
        },
        () => {
          console.log(`Server is running on ${config.API_URL}`);
        }
      );
    });
  });
}

start();
