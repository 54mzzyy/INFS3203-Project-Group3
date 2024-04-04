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

async function startSession(session_data) {
    await connectDatabase()
    let sessions = db.collection('sessions')
    await sessions.insertOne(session_data)
}

async function getSession(session_id) {
    await connectDatabase()
    let sessions = db.collection('sessions')
    let result = await sessions.find({sessionNumber: session_id})
    let resultData = await result.toArray()
    return resultData[0]
}

async function deleteSession(session_id) {
    await connectDatabase()
    let sessions = db.collection('sessions')
    sessions.deleteOne({sessionNumber: session_id})
}

module.exports = {
    connectDatabase,
    getUserDetails,
    startSession, getSession, deleteSession
}
