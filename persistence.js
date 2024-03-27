const { MongoClient } = require('mongodb')

let client = undefined
let db = undefined

async function connectDatabase() {
    if (!client) {
        client = new MongoClient('mongodb+srv://ahmed:12class34@cluster0.qgtdkrd.mongodb.net/')
        await client.connect()
        db = client.db('tourq')
        return db
    }
}

async function getUserDetails(username) {
  await connectDatabase();
  let users = db.collection("user");
  let result = await users.findOne({ username: username });
  return result;
}

module.exports = {
    connectDatabase        
}
