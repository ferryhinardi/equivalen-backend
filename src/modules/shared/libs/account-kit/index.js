import isEmpty from 'lodash/isEmpty';
import request from 'superagent';
import hmac from 'crypto-js/hmac-sha256';

import config from 'config/app';

export function getAccessTokenFromCode(code) {
  return new Promise((resolve, reject) => {
    // Exchange authorization code for access token
    const url = `https://graph.accountkit.com/${config.FACEBOOK_ACCOUNT_KIT_VERSION}/access_token`;
    return request
      .get(url)
      .query({
        grant_type: 'authorization_code',
        access_token: `AA|${config.FACEBOOK_APP_ID}|${config.FACEBOOK_ACCOUNT_KIT_APP_SECRET}`,
        code
      })
      .end((err, res) => {
        if (!isEmpty(err)) reject(res.body.error.message);
        else resolve(res.body);
      });
  });
}

export function validateAccessToken(accessToken) {
  return new Promise((resolve, reject) => {
    const url = `https://graph.accountkit.com/${config.FACEBOOK_ACCOUNT_KIT_VERSION}/me/`;
    return request
      .get(url)
      .query({
        access_token: accessToken,
        appsecret_proof: hmac(accessToken, config.FACEBOOK_ACCOUNT_KIT_APP_SECRET).toString()
      })
      .end((err, res) => {
        if (!isEmpty(err)) reject(res.body.error.message);
        else resolve(res.body);
      });
  });
}
