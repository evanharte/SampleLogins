const dal = require("./auth_db");

var getLogins = function () {
  if (DEBUG) console.log("logins.pg.dal.getLogins()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, username, password FROM public."Logins" \ 
    ORDER BY id DESC LIMIT 7;`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var addLogin = function (username, password) {
  if (DEBUG) console.log("logins.pg.dal.addLogin()");
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO public."Logins"(username, password) \
    VALUES ($1, $2)`;
    // the $1 and $2 are placeholders for the username and password in next line.
    dal.query(sql, [username, password], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getLogins,
  addLogin,
};
