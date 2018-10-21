import config from 'config/app';
import request from 'modules/shared/helpers/request';

const Authorization = `Basic ${Buffer.from(config.XENDIT.secretKey).toString('base64')}`;
request.init(config.XENDIT.host, {
  Authorization
});

export default request;
