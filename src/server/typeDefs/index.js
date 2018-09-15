import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, '../../modules/**/*.gql'));
mergeTypes(typesArray, { all: true });
export default mergeTypes(typesArray, { all: true });
