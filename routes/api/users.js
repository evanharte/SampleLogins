var router = require("express").Router();
// const usersDal = require("../../services/pg.users.dal");
const usersDal = require("../../services/m.users.dal");

// api/users - GET a list of all users
router.get("/", async (req, res) => {
  if (DEBUG) console.log("REQUEST: /api/users/ GET " + req.url);
  try {
    let theUsers = await usersDal.getUsers();
    res.json(theUsers);
  } catch (err) {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// api/users/:id - GET a single user
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("REQUEST: /api/users/:id GET " + req.url);
  try {
    let theUser = await usersDal.getUserByUserId(req.params.id);
    res.json(theUser);
  } catch (err) {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
    console.log(err);
  }
});

module.exports = router;
