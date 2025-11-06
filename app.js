const express = require("express");
const app = express();
const path = require("node:path");
require('dotenv').config();
const { indexRouter } = require("./routes/indexRouter");
const { newRouter } = require("./routes/newRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/new", newRouter);
app.get('/{*splat}', (req, res, next) => {
  const err = new Error(`Page not found: ${req.originalUrl}`);
  err.statusCode = 404
  next(err)
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).render('error', { title: 'Error', error: err});
});
