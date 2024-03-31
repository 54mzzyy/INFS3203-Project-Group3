const request = require('supertest');
const business = require('./business');
const app = require('./app'); // assuming your express app is exported from app.js

jest.mock('./business');

describe('Presentation Layer', () => {
  it('renders the login page on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('login'); // replace 'login' with some unique text from your login page
  });

  it('redirects to home on successful POST /', async () => {
    business.verifiedUser.mockReturnValue(true);
    const response = await request(app).post('/').send({ username: 'test', password: 'password' });
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/home');
  });

  it('renders invalid page on unsuccessful POST /', async () => {
    business.verifiedUser.mockReturnValue(false);
    const response = await request(app).post('/').send({ username: 'test', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.text).toContain('invalid'); // replace 'invalid' with some unique text from your invalid page
  });

  // Add more tests for other routes
});