import jwt from 'jsonwebtoken';

const SECRET = 'hush-jangan-bilang2';

export function getToken(payload, time = 24 * 3600 * 14) {
  return jwt.sign(payload, SECRET, {
    expiresIn: time
  });
}

export function verify(token) {
  return jwt.verify(token, SECRET);
}