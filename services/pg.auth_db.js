const Pool = require("pg").Pool;
const pool = new Pool({
  user: "evanharte",
  host: "localhost",
  database: "Auth",
  password: "12345",
  port: 5432,
});

if (DEBUG) console.log("connected to PostgreSQL...");

module.exports = pool;
