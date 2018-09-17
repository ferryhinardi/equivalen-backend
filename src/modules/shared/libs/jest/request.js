import app from 'server';
import request from 'supertest';

export default async function req(query, variables = {}, headers = {}) {
  const result = await request(app)
    .post('/')
    .set(headers)
    .send({
      query,
      variables
    });

  if (result.body.errors) {
    console.error(JSON.stringify(result.body.errors));
    throw result.body.errors;
  }
  return result;
}
