const persistence = require('./persistence')
const crypto = require('crypto')

async function addUser(u, p) {
  let newUser = {
    username: u,
    password: p,
    email: e
  }
  await persistence.addUser(newUser)
}

async function verifyUser(user, pass) {
  let encryptedpass = await hashPassword(pass)
  return await persistence.verifyUser(user, encryptedpass)
}

async function hashPassword(pass) {
  let hash = crypto.createHash('sha512')
  hash.update(pass)
  let encryptedpass = hash.digest('hex')
  return encryptedpass
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

async function getUserDetails(username) {
  return await persistence.getUserDetails(username)
}

module.exports = {
  addUser, verifyUser,
  startSession, getSessionData, deleteSession, getUserDetails
}