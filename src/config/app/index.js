import * as test from './index.testing';
import * as development from './index.development';
import * as production from './index.production';
import xendit from '../xendit';

export const config = {
  test,
  development,
  production,
  ...xendit
}[process.env.NODE_ENV || 'development'];

export default config;
