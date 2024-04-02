const persistence = require('./persistence')
const crypto = require('crypto')

async function verifiedUser(u, p) {
  let details = await persistence.getUserDetails(u);
  let hashedPass = createHash("sha512").update(p).digest("hex")  
  if (details == undefined || details.password != hashedPass) {
    return undefined;
  }
}

async function startSession(data) {
  let sessionId = crypto.randomUUID()
  let sessionData = {
      sessionNumber: sessionId,
      expiry: new Date(Date.now() + 1000*60),
      data: data
  }
  await persistence.startSession(sessionData)
  return sessionData
}

async function getSessionData(key) {
  return await persistence.getSession(key)
}

async function deleteSession(key) {
  await persistence.deleteSession(key)
}

module.exports = {
  verifiedUser,
  startSession, getSessionData, deleteSession
}