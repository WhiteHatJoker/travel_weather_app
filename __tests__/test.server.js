const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Get dummy data from Express', () => {
  it('/getData', async done => {
    const response = await request.get('/getData');
    expect(response.status).toBe(200);
    done();
  });
});