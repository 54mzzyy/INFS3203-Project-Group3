const { MongoClient } = require('mongodb')

let client = undefined 

async function connectDatabase() {
    if (!client) {
        client = new MongoClient('mongodb+srv://ahmed:12class34@cluster0.qgtdkrd.mongodb.net/')
        await client.connect()
    }
}

module.exports = {
    
}