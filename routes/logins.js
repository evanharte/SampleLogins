const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const bcrypt = require("bcrypt");

// const loginsDal = require("../services/pg.logins.dal");
const loginsDal = require("../services/m.logins.dal");

router.get("/", async (req, res) => {
  try {
    let theLogins = await loginsDal.getLogins();
    if (DEBUG) console.table(theLogins);
    res.render("logins", { theLogins });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const aLogin = [
  //   { id: 1, username: "example", password: "example" }
  // ];
  try {
    let aLogin = await loginsDal.getLoginByLoginId(req.params.id); // from postgres
    if (DEBUG) console.table(aLogin);
    if (aLogin.length === 0) res.render("norecord");
    else res.render("login", { aLogin });
  } catch {
    res.render("503");
  }
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("login.Edit : " + req.params.id);
  res.render("loginPatch.ejs", {
    username: req.query.username,
    password: req.query.password,
    email: req.query.email,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("login.Delete : " + req.params.id);
  res.render("loginDelete.ejs", {
    username: req.query.username,
    theId: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("logins.POST");
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (DEBUG) console.log("hashedPassword: " + hashedPassword);
    let result = await loginsDal.addLogin(
      req.body.username,
      hashedPassword,
      req.body.email,
      uuid.v4()
    );
    if (DEBUG) console.log("result: " + result);
    res.redirect("/logins/");
  } catch (err) {
    if (DEBUG) console.log(err);
    // log this error to an error log file.
    res.render("503");
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("logins.PATCH: " + req.params.id);
  try {
    await loginsDal.patchLogin(
      req.params.id,
      req.body.username,
      req.body.password,
      req.body.email
    );
    res.redirect("/logins/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("logins.DELETE: " + req.params.id);
  try {
    await loginsDal.deleteLogin(req.params.id);
    res.redirect("/logins/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
