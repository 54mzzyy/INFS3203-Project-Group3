const persistence = require('./persistence')
const { createHash, randomUUID } = require("node:crypto") 

async function verifiedUser(u, p) {
  let details = await persistence.getUserDetails(u);
  let hashedPass = createHash("sha512").update(p).digest("hex")  
  if (details == undefined || details.password != hashedPass) {
    return undefined;
  }
}

module.exports = {
  attemptLogin
}

