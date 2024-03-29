if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "EvzaursRex" });
});

const loginsRouter = require("./routes/logins");
app.use("/logins", loginsRouter);

// anything beginning with "/api" will go into this
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}`);
});
