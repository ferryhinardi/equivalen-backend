import { QuestionFactory } from '../modules/question/models/factories/question';

export default {
  up: () => Promise.resolve(Array(20).fill(0).reduce(promise => promise.then(() => QuestionFactory()), Promise.resolve([]))),
  down: queryInterface => queryInterface.bulkDelete('schools', null, {}),
};
