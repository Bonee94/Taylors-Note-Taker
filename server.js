const express = require("express");
const path = require("path");
const html = require("./routes/index");

const clog = require("./middleware/clog");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
