import request from 'modules/shared/libs/jest/request';

import { User } from 'models';
import {
  verify
} from 'modules/shared/libs/jwt';

describe('test accountKit', () => {
  it('should register user with accountKit provider', async () => {
    let query = {};
    query = `
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
            }
          ) {
            user {
              id
              email
            }
          }
        }
      `;
    const resultRegisterUser = await request(query, undefined, { Authorization: `Bearer ${token}`});
    const { user } = resultRegisterUser.body.data.registerViaAccountKit;
    const users = await User.findAll();
    expect(users.length).toEqual(1);
    expect(user.email).toEqual('jekiwijaya@hotmail.com');
  });
});