const { Pool } = require('pg')

let pool;
let config;

if (process.env.DATABASE_URL) { //it's set in Heroku
  const connectionString = process.env.DATABASE_URL
  config = {
    connectionString: connectionString,
    sslmode: require,
    ssl: {
      rejectUnauthorized: false
    }
  }
} else { //default local config
  config = {
  user: process.env.database_user,
  host: 'localhost',
  database: 'cyf_knowledge_checklist',
  password: 123,
  port: 5432,

  }
}
pool = new Pool(config)  

exports.Connection = pool
//module.exports = pool;