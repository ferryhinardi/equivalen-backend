import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secret = 'secret';

export function encrypt(data) {
  const text = typeof data === 'string' ? data : JSON.stringify(data);
  const cipher = crypto.createCipher(algorithm, secret);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  
  return crypted;
}

export function decrypt(text) {
  const decipher = crypto.createDecipher(algorithm, secret);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');

  let returnValue;

  try {
    returnValue = JSON.parse(dec);
  } catch(err) {
    returnValue = dec;
  }

  return returnValue;
}
