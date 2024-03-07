const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Evan" });
});

app.get("/404", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
