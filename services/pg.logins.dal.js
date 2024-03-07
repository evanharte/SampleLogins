const dal = require("./auth_db");

var addLogin = function (username, password) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO public."Logins"(username, password) \
    VALUES ($1, $2)`;
    dal.query(sql, [username, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
