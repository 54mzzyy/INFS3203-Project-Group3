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

async function verifyUser(username, password) {
    await connectDatabase()
    users = db.collection('user')
    let userlist = await users.find().toArray()
    for(u of userlist) {
        if(username === u.username) {
            if(password === u.password) {
                return true
            }
        }
    }
    return false
}

async function getUserDetails(username) {
  await connectDatabase()
  let users = db.collection("user")
  let result = await users.findOne({ username: username })
  return result;
}

module.exports = {
    addUser, verifyUser, getUserDetails
}