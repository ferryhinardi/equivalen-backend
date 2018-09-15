import { UserFactory } from '../modules/user/models/factories/user';

export default {
  up: () =>
    Promise.resolve(
      Array(20)
        .fill(0)
        .reduce(promise => promise.then(() => UserFactory()), Promise.resolve([]))
    ),
  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
