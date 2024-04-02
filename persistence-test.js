const { connectDatabase, getUserDetails } = require('./persistence');
const { MongoClient } = require('mongodb');

jest.mock('mongodb');

describe('Persistence Layer', () => {
  let dbMock;
  let collectionMock;

  beforeEach(() => {
    collectionMock = {
      findOne: jest.fn(),
    };
    dbMock = {
      collection: jest.fn().mockReturnValue(collectionMock),
    };
    MongoClient.mockReturnValue({
      connect: jest.fn().mockResolvedValue(undefined),
      db: jest.fn().mockReturnValue(dbMock),
    });
  });

  it('connects to the database if not connected', async () => {
    await getUserDetails('testUser');
    expect(MongoClient).toHaveBeenCalled();
    expect(dbMock.collection).toHaveBeenCalledWith('user');
  });

  it('fetches user details from the database', async () => {
    const mockUser = { username: 'testUser', password: 'password' };
    collectionMock.findOne.mockResolvedValue(mockUser);

    const result = await getUserDetails('testUser');
    expect(collectionMock.findOne).toHaveBeenCalledWith({ username: 'testUser' });
    expect(result).toEqual(mockUser);
  });
});