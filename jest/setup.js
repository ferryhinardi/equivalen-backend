import { sequelize } from 'models';

jest.mock('modules/shared/libs/account-kit');

beforeAll(() => sequelize.sync({ force: true }));
beforeEach(async () => { // Before each test we empty the database
  await sequelize.truncate();
});
jest.setTimeout(30000);