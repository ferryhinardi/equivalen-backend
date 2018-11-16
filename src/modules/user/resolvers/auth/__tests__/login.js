import request from 'modules/shared/libs/jest/request';

import { sequelize } from 'models';
import { UserFactory } from 'modules/user/models/factories/user';
import { UserDeviceFactory } from 'modules/user/models/factories/userDevice';

describe('test login', () => {
  beforeAll(() => sequelize.sync({ force: true }));
  beforeEach(done => {
    // Before each test we empty the database
    sequelize.truncate().then(() => {
      done();
    });
  });

  it('should success login', async () => {
    const userf = await UserFactory({
      password: 'secret'
    });
    const userDevice = await UserDeviceFactory({
      user_id: userf.id
    });
    const result = await request(`
      mutation {
        login(auth:{
          username:"${userf.username}"
          password:"secret"
          deviceId:"${userDevice.deviceId}"
        }){
          user{
            id
          }
          token
        }
      }
    `);
    const { user, token } = result.body.data.login;
    expect(Number.parseInt(user.id, 10)).toEqual(userf.id);
    expect(token).toEqual(userf.getToken());
  });

  it('should fail login, because password mismatch', async () => {
    const userf = await UserFactory({
      password: 'secret'
    });
    let error = null;
    try {
      await request(`
        mutation {
          login(auth:{
            username:"${userf.username}"
            password:"x"
          }){
            user{
              id
            }
            token
          }
        }
      `);
    } catch (e) {
      error = e;
    }
    expect(error).toBeTruthy();
  });

  it('should fail login, because user not found', async () => {
    await UserFactory({
      password: 'secret'
    });
    let error = null;
    try {
      await request(`
        mutation {
          login(auth:{
            username:"x"
            password:"secret"
          }){
            user{
              id
            }
            token
          }
        }
      `);
    } catch (e) {
      error = e;
    }
    expect(error).toBeTruthy();
  });

  it('should fail login, because device never registered', async () => {
    const userf = await UserFactory({
      password: 'secret'
    });
    let error = null;

    try {
      await request(`
        mutation {
          login(auth:{
            username:"${userf.username}"
            password:"secret"
            deviceId:"xxx"
          }){
            user{
              id
            }
            token
          }
        }
      `);
    } catch (e) {
      error = e;
    }
    expect(error).toBeTruthy();
  });

  it('should fail login, because wrong device registered', async () => {
    const userf = await UserFactory({
      password: 'secret'
    });
    await UserDeviceFactory({
      user_id: userf.id
    });
    let error = null;

    try {
      await request(`
        mutation {
          login(auth:{
            username:"${userf.username}"
            password:"secret"
            deviceId:"xxx"
          }){
            user{
              id
            }
            token
          }
        }
      `);
    } catch (e) {
      error = e;
    }
    expect(error).toBeTruthy();
  });
});
