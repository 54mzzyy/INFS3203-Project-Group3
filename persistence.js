const { MongoClient } = require('mongodb')

let client = undefined 

async function connectDatabase() {
    if (!client) {
        client = new MongoClient('mongodb+srv://ahmed:12class34@cluster0.qgtdkrd.mongodb.net/')
        await client.connect()
    }
}

async function startSession(session_data) {
    await connectDatabase()
    let db = client.db('project')
    let sessions = db.collection('sessions')
    sessions.insertOne(session_data)
}

async function getSession(session_id) {
    await connectDatabase()
    let db = client.db('project')
    let sessions = db.collection('sessions')
    let result = await sessions.find({sessionNumber: session_id})
    let resultData = await result.toArray()
    return resultData[0]
}

async function deleteSession(session_id) {
    await connectDatabase()
    let db = client.db('project')
    let sessions = db.collection('sessions')
    let result = await sessions.find({sessionNumber: session_id})
    delete result
}

module.exports = {
    startSession, getSession, deleteSession
}
