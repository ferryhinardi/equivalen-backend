import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const fixturesArray = fileLoader(path.join(__dirname, '../modules/**/fixtures/*.js'), {
  extensions: ['.js']
});
const fixturesWithoutTest = fileLoader(
  path.join(__dirname, '../../modules/**/fixtures/**/!(__tests__)/*.js'),
  { extensions: ['.js'] }
);

const fixtures = fixturesArray.concat(fixturesWithoutTest);

export default mergeResolvers(fixtures);
