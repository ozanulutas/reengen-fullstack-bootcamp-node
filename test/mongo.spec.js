const { MongoClient } = require('mongodb');

// https://github.com/shelfio/jest-mongodb
// db testleri için ayrı bir db açmak daha iyi olur

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    const url = "mongodbconfiginfo"
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  const users = db.collection('users');
  const mockUser = { _id: 'some-user-id', name: 'John' };

  test("user ekleme", async () => {

    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  })

  test("user güncelleme", async () => {
    const updatedMockUser = { name: 'John' };
    const updatedUser = await users.findOneAndUpdate({ _id: 'some-user-id' });
    expect(updatedUser).toEqual({ _id: 'some-user-id', ...updatedMockUser });
  })

  test("user silme", async () => {
    await users.deleteOne(mockUser._id);

    const deletedUser = await users.findOne({ _id: 'some-user-id' });
    expect(deletedUser).not.toEqual(mockUser);
  })
});