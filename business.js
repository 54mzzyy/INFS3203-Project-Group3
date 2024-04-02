const persistence = require('./persistence')
const crypto = require('crypto')

async function verifiedUser(u, p) {
  let details = await persistence.getUserDetails(u);
  let hashedPass = createHash("sha512").update(p).digest("hex")  
  if (details == undefined || details.password != hashedPass) {
    return undefined;
  }
}

async function startSession(key) {
  await persistence.startSession(key)
}

async function getSession(key) {
  return await persistenc.getSession(key)
}

async function deleteSession(key) {
 await persistence.deleteSession(key)
}

module.exports = {
  verifiedUser,
  startSession, getSession, deleteSession
}