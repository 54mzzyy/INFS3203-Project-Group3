const persistence = require('./persistence')
const { createHash, randomUUID } = require("node:crypto") #weCanRemoveThatLine

async function attemptLogin(u, p) {
  let details = await persistence.getUserDetails(u);
  let hashedPass = createHash("sha512").update(p).digest("hex")  #weCanRemoveThatLine
  if (details == undefined || details.password != hashedPass) {
    return undefined;
  }
}

module.exports = {
  attemptLogin
}

