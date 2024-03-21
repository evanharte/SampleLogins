const dal = require("./pg.auth_db");

var getUsers = function () {
  if (DEBUG) console.log("users.pg.dal.getUsers()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT _id, first_name, last_name, username, sms_phone, gender, profile_url, birth_date, join_date FROM public."users" ORDER BY _id DESC;`;
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

async function getUserByUserId(id) {
  if (DEBUG) console.log("pg.users.dal.getUserByUserId()");
  const sql = `SELECT _id, first_name, last_name, username, sms_phone, gender, profile_url, birth_date, join_date FROM public."users" WHERE _id = $1;`;
  try {
    let result = await dal.query(sql, [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// var addLogin = function (username, password, email, uuid) {
//   if (DEBUG) console.log("logins.pg.dal.addLogin()");
//   return new Promise(function (resolve, reject) {
//     const sql = `INSERT INTO public."Logins"(username, password, email, uuid) \
//     VALUES ($1, $2, $3, $4) RETURNING id;`;
//     // the $1 and $2 are placeholders for the username and password in next line.
//     dal.query(sql, [username, password, email, uuid], (err, result) => {
//       if (err) {
//         if (DEBUG) console.log(err);
//         reject(err);
//       } else {
//         resolve(result.rows);
//       }
//     });
//   });
// };

// var patchLogin = function (id, username, password, email) {
//   if (DEBUG) console.log("logins.pg.dal.patchLogin()");
//   return new Promise(function (resolve, reject) {
//     const sql = `UPDATE public."Logins" SET username=$2, password=$3, email=$4 WHERE id=$1;`;
//     dal.query(sql, [id, username, password, email], (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result.rows);
//       }
//     });
//   });
// };

// var deleteLogin = function (id) {
//   if (DEBUG) console.log("logins.pg.dal.deleteLogin()");
//   return new Promise(function (resolve, reject) {
//     const sql = `DELETE FROM public."Logins" WHERE id = $1;`;
//     dal.query(sql, [id], (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result.rows);
//       }
//     });
//   });
// };

module.exports = {
  getUsers,
  // addUser,
  getUserByUserId,
  // patchUser,
  // deleteUser,
};
