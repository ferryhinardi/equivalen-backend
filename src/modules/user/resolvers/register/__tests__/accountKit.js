import request from 'modules/shared/libs/jest/request';

import { User } from 'models';

describe('test accountKit', () => {

  it('should register user with accountKit provider', async () => {
      const query = `
        mutation {
          loginViaAccountKit (
            code: "123",
            user: {
              email: "jekiwijaya@hotmail.com"
              username: "jekiwijaya"
              phoneNumber: "089536789121"
              password: "test"
            }
          ) {
            user {
              id
              email
            }
            token
          }
        }
      `;
    const result = await request(query);
    const { user, token } = result.body.data.loginViaAccountKit;
    const users = await User.findAll();
    const [ firstUser ] = users;
    expect(users.length).toEqual(1);
    expect(user.email).toEqual('jekiwijaya@hotmail.com');
    expect(firstUser.isValidToken(token)).toBeTruthy();
  });
});