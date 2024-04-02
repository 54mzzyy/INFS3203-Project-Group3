const persistence = require('./persistence');

describe('Persistence', () => {
    test('getUserDetails', async () => {
        const u = 'testuser';
        const details = {
            username: u,
            password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
        };
        const result = await persistence.getUserDetails(u);
        expect(result).toBe(details);
    });
});