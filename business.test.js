const business = require('./business');

describe('Business', () => {
    test('verifiedUser', async () => {
        const u = 'testuser';
        const p = 'testpassword';
        const details = {
            username: u,
            password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
        };
        jest.spyOn(business.persistence, 'getUserDetails').mockResolvedValue(details);
        const result = await business.verifiedUser(u, p);
        expect(result).toBe(details);
    });

    test('verifiedUser with invalid user', async () => {
        const u = 'testuser';
        const p = 'testpassword';
        jest.spyOn(business.persistence, 'getUserDetails').mockResolvedValue(undefined);
        const result = await business.verifiedUser(u, p);
        expect(result).toBe(undefined);
    });

    test('verifiedUser with invalid password', async () => {
        const u = 'testuser';
        const p = 'testpassword';
        const details = {
            username: u,
            password: 'invalid'
        };
        jest.spyOn(business.persistence, 'getUserDetails').mockResolvedValue(details);
        const result = await business.verifiedUser(u, p);
        expect(result).toBe(undefined);
    });

    test('startSession', async () => {
        const key = 'testkey';
        jest.spyOn(business.persistence, 'startSession').mockResolvedValue();
        await business.startSession(key);
        expect(business.persistence.startSession).toHaveBeenCalledWith(key);
    });

    test('getSession', async () => {
        const key = 'testkey';
        const session = {
            key: key
        };
        jest.spyOn(business.persistence, 'getSession').mockResolvedValue(session);
        const result = await business.getSession(key);
        expect(result).toBe(session);
    });

    test('deleteSession', async () => {
        const key = 'testkey';
        jest.spyOn(business.persistence, 'deleteSession').mockResolvedValue();
        await business.deleteSession(key);
        expect(business.persistence.deleteSession).toHaveBeenCalledWith(key);
    });
});