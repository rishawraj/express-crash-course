const express = require("express");
const path = require("path");
// const exphbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./members");

const app = express();
const PORT = 5000;

// const PORT = process.env.PORT || 2300;

// init middleware
// app.use(logger);

// Handlebars middleware
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// home page route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App!!",
    members,
  });
});

// set a static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
