import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const resolversArray = fileLoader(path.join(__dirname, '../../modules/**/resolvers/!(__tests__)/*.js'), { extensions: ['.js'] });

export default mergeResolvers(resolversArray);