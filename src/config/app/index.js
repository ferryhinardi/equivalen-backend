import * as test from './index.testing';
import * as development from './index.development';
import * as staging from './index.staging';
import * as production from './index.production';

export const config = {
  test,
  development,
  staging,
  production,
}[process.env.NODE_ENV || 'development'];

export default config;
