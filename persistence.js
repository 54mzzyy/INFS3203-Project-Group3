const { MongoClient } = require('mongodb')

let client = undefined
let db = undefined

async function connectDatabase() {
    if (!client) {
        client = new MongoClient('mongodb+srv://60102486:12class34@cluster0.1ygggw6.mongodb.net/')
        await client.connect()
        db = client.db('tourq')
        return db
    }
}

async function addUser(newUser) {
    await connectDatabase()
    let users = db.collection("user")
    users.insertOne(newUser)
}

async function getUserDetails(username) {
  await connectDatabase()
  let users = db.collection("user")
  let result = await users.findOne({ username: username })
  return result;
}

module.exports = {
    addUser, getUserDetails
}