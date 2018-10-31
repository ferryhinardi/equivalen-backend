import config from 'config/xendit';
import request from 'modules/shared/helpers/request';

const Authorization = `Basic ${Buffer.from(config.xenditSecretKey).toString('base64')}`;
request.init(config.xenditHost, {
  Authorization
});

export default request;
