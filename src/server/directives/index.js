import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const directivesArray = fileLoader(path.join(__dirname, '../../modules/**/directives/*.js'), {
  extensions: ['.js']
});
const directivesWithoutTest = fileLoader(
  path.join(__dirname, '../../modules/**/directives/!(__tests__)/*.js'),
  { extensions: ['.js'] }
);

const directives = directivesArray.concat(directivesWithoutTest);

export default mergeResolvers(directives);
