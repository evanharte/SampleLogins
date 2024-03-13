var router = require("express").Router();

if (DEBUG) {
  // console.log("ROUTE: /api/actors");
  console.log("ROUTE: /api");
  // console.log("ROUTE: /api/full");
  // console.log("ROUTE: /api/users");
}
// http://localhost:3000/api/actors/
// const actorsRouter = require("./actors");
// router.use("/actors", actorsRouter);

// http://localhost:3000/api/
router.get("/", (req, res) => {
  res.send("API Home Page");
});

// http://localhost:3000/api/logins/
const loginsRouter = require("./logins");
router.use("/logins", loginsRouter);

module.exports = router;
