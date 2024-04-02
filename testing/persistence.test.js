const persistence = require('../persistence');

describe('Persistence', () => {
    test('getUserDetails', async () => {
        const u = 'testuser';
        const details = {
            username: testuser,
            password: '1234abcd'
        };
        const result = await persistence.getUserDetails(u);
        expect(result).toBe(details);
    });
});