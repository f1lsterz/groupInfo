const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages", "main.html"));
});

app.get("/student/:username", (req, res) => {
  const username = req.params.username;

  fs.readFile(
    path.join(__dirname, "public/data/students.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.redirect("/error");
        return;
      }
      const students = JSON.parse(data);
      const student = students.find((student) => student.name === username);
      res.render("student", { student });
    }
  );
});

app.use(function (req, res, next) {
  res.status(404).render("error");
});

app.listen(PORT, () => {
  console.log("Server is working: http://localhost:3000");
});
