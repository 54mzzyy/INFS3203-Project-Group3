const business = require('../business');
const { describe, test, expect } = require('@jest/globals');
const { jest } = require('@jest/globals');

describe('Business', () => {
    test('verifiedUser with valid credentials', async () => {
        const u = 'admin';
        const p = '12admin34';
        const details = {
            username: u,
            password: p
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
        const u = 'admin';
        const p = 'incorrect_password'; // Provide an incorrect password here
        const details = {
            username: u,
            password: '12admin34'
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