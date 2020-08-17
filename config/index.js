const dotenv = require("dotenv")
dotenv.config();

let port, mongoUri, secretKey, email, password;
switch (process.env.NODE_ENV) {
  case "local":
    port = process.env.LOCAL_PORT
    mongoUri = process.env.LOCAL_MONGO_URI
    secretKey = process.env.LOCAL_SECRET_KEY
    email = process.env.LOCAL_EMAIL
    password = process.env.LOCAL_PASSWORD
    break;

  case "staging":
    port = process.env.STAGING_PORT
    mongoUri = process.env.STAGING_MONGO_URI
    secretKey = process.env.STAGING_SECRET_KEY
    email = process.env.STAGING_EMAIL
    password = process.env.STAGING_PASSWORD
    break;
}

module.exports = {
  port, mongoUri, secretKey, email, password
}