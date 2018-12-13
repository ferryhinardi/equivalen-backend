import Mustache from 'mustache';
import moment from 'moment';
import { User } from 'models';
import { verify } from 'modules/shared/libs/jwt';
import { decrypt } from 'modules/shared/helpers/encryption';
import templates from '../templates';

const debug = require('debug')('app');

function checkHashUrl(string) {
  const hashUrl = decrypt(string);
  const { token, timestamp } = hashUrl;
  const { id } = verify(token);
  const timeleft = moment(timestamp).diff(moment().subtract(1, 'hours').format(), 'minutes');
  const expired = timeleft < 0;

  debug(`time expire forgot password: ${timeleft} minutes`);

  return {
    expired,
    id,
    encryptKey: string,
  };
};

export function showForgotPasswordForm(req, res) {
  const hashUrl = req.query.key;
  const { expired, encryptKey } = checkHashUrl(hashUrl);

  if (expired) {
    res.status(404).send('Link already Expired');
  } else {
    const data = { encryptKey };
    const forgotPasswordTemplate = Mustache.render(templates['forgot-password'], data);
    res.send(forgotPasswordTemplate);
  }
};

export async function postForgotPassword(req, res) {
  const { key, newPassword } = req.body;
  const { id } = checkHashUrl(key);
  let forgotPasswordResultTemplate;

  try {
    await User.forgotPassword(id, newPassword);
    
    forgotPasswordResultTemplate = Mustache.render(
      templates['forgot-password-result'],
      { success: true, message: 'Update Password Sukses!' }
    );
  } catch (error) {
    forgotPasswordResultTemplate = Mustache.render(
      templates['forgot-password-result'],
      { success: false, message: error }
    );
  }

  res.send(forgotPasswordResultTemplate);
}

