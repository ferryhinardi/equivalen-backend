import app from 'server';
import request from 'supertest';

export async function get(url, headers = {}) {
  const result = await request(app)
    .get(url)
    .set(headers);

  if (result.body.errors) {
    console.error(JSON.stringify(result.body.errors));
    throw result.body.errors;
  }
  return result;
}

export async function post(url, params = {}, headers = {}) {
  const result = await request(app)
    .post(url)
    .set(headers)
    .send(params);

  if (result.body.errors) {
    console.error(JSON.stringify(result.body.errors));
    throw result.body.errors;
  }
  return result;
}

