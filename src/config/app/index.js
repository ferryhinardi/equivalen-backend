import * as test from './index.testing';
import * as development from './index.development';
import * as production from './index.production';

export const config = {
  test,
  development,
  production
}[process.env.NODE_ENV || 'development'];

export default config;
