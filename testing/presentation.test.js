const request = require('supertest');
const app = require('../presentation');
const { describe, it, expect } = require('@jest/globals');

// Create a test suite
describe('Presentation Layer Tests', () => {
  // Test the GET '/' route
  it('GET / should return the login page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('<h2>Login</h2>');
  });

  // Test the POST '/' route for successful login
  it('POST / should redirect to /home for valid credentials', async () => {
    const response = await request(app)
      .post('/')
      .send({ username: 'validUsername', password: 'validPassword' });
    expect(response.status).toEqual(302); // Redirect status code
    expect(response.header.location).toEqual('/home'); // Redirects to home
  });

  // Test the POST '/' route for invalid credentials
  it('POST / should return the login page for invalid credentials', async () => {
    const response = await request(app)
      .post('/')
      .send({ username: 'invalidUsername', password: 'invalidPassword' });
    expect(response.status).toEqual(200);
    expect(response.text).toContain('<h2>Login</h2>');
  });

  // Test the GET '/home' route
  it('GET /home should return the home page', async () => {
    const response = await request(app).get('/home');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('<h2>Home</h2>');
  });

  // Test the GET '/register' route
  it('GET /register should return the register page', async () => {
    const response = await request(app).get('/register');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('<h2>Register</h2>');
  });

});
