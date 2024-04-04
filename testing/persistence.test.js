const persistence = require('../persistence');
const { describe, test, expect } = require('@jest/globals');

describe('Persistence', () => {
    test('getUserDetails', async () => {
        const u = 'testuser';
        const details = {
            username: 'admin',
            password: '12admin34'
        };
        const result = await persistence.getUserDetails(u);
        expect(result).toBe(details);
    });
});