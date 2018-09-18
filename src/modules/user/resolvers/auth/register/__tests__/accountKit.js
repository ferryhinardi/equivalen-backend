import request from 'modules/shared/libs/jest/request';

import { User, sequelize } from 'models';
import UserFactory from 'modules/user/models/factories/user';
import { verify } from 'modules/shared/libs/jwt';

async function getToken() {
  const query = `
    mutation {
      getPrefillViaAccountKit (
        code: "123"
      ) {
        user {
          phoneNumber
        }
        token
      }
    }
  `;
  const resultGetToken = await request(query);
  const { token } = resultGetToken.body.data.getPrefillViaAccountKit;
  return token;
}

describe('test accountKit', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  it('should register user with accountKit provider', async () => {
    let query = {};
    const token = await getToken();
    const { phoneNumber } = verify(token);
    expect(phoneNumber).toEqual('089536789121');

    query = `
        mutation {
          registerViaAccountKit (
            user: {
              email: "jekiwijaya@hotmail.com"
              username: "jekiwijaya"
              phoneNumber: "089536789121"
              password: "test"
              placeBod: "Jakarta"
              dateBod: "1995-12-17"
            }
          ) {
            user {
              id
              email
              placeBod
              dateBod
            }
          }
        }
      `;
    const resultRegisterUser = await request(query, undefined, {
      Authorization: `Bearer ${token}`
    });
    const { user } = resultRegisterUser.body.data.registerViaAccountKit;
    const users = await User.findAll();
    expect(users.length).toEqual(1);
    expect(user.email).toEqual('jekiwijaya@hotmail.com');
    expect(user.placeBod).toEqual('Jakarta');
    expect(user.dateBod).toBeTruthy();
  });

  it('should cannot register with same email', async () => {
    let query = '';
    const token = await getToken();
    await UserFactory({
      email: 'admin@admin.com'
    });
    query = `
        mutation {
          registerViaAccountKit (
            user: {
              email: "admin@admin.com"
              username: "jekiwijaya"
              phoneNumber: "089536789121"
              password: "test"
              placeBod: "Jakarta"
              dateBod: "1995-12-17"
            }
          ) {
            user {
              id
              email
              placeBod
              dateBod
            }
          }
        }
      `;
    let error;
    try {
      await request(query, null, {
        Authorization: `Bearer ${token}`
      });
    } catch (e) {
      error = e;
    }
    expect(error[0].message).toEqual('email already registered');
  });

  it('should cannot register with same username', async () => {
    let query = '';
    const token = await getToken();
    await UserFactory({
      username: 'admin'
    });
    query = `
        mutation {
          registerViaAccountKit (
            user: {
              email: "admin@admin.com"
              username: "admin"
              phoneNumber: "089536789121"
              password: "test"
              placeBod: "Jakarta"
              dateBod: "1995-12-17"
            }
          ) {
            user {
              id
              email
              placeBod
              dateBod
            }
          }
        }
      `;
    let error;
    try {
      await request(query, null, {
        Authorization: `Bearer ${token}`
      });
    } catch (e) {
      error = e;
    }
    expect(error[0].message).toEqual('username already registered');
  });
});