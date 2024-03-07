const Pool = require("pg").Pool;
const pool = new Pool({
  user: "evan",
  password: "12345",
  host: "localhost",
  database: "auth_db",
  port: 5432,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = {
  query,
};
