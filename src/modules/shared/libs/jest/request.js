import server from 'server';
import request from 'supertest';

let app;

beforeAll(async () => {
  app = await server.start({ port: 4010 });
});

afterAll(() => app.close());

export default async function req(query, variables = {}, headers = {}) {
  const result = await request(app)
    .post('/')
    .set(headers)
    .send({
      query,
      variables,
    });

  if (result.body.errors) {
    console.error(JSON.stringify(result.body.errors));
    throw result.body.errors;
  }
  return result;
}
