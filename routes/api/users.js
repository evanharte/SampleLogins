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

router.post("/", async (req, res) => {
  if (DEBUG) console.log("REQUEST: /api/users/ POST " + req.url);
  try {
    var result = await usersDal.addUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username
    );
    if (result === 11000) {
      res.status = 409;
      res.json({ message: "Duplicate username", status: 409 });
    } else res.json({ message: "User added", status: 200 });
  } catch (err) {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
    console.log(err);
  }
});

module.exports = router;
