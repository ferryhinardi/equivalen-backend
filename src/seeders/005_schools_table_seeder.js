import { SchoolFactory } from "../modules/school/models/factories/school";

export default {
  up: () => Promise.resolve(Array(20).fill(0).reduce(promise => promise.then(() => SchoolFactory()), Promise.resolve([]))),
  down: queryInterface => queryInterface.bulkDelete('schools', null, {}),
};
