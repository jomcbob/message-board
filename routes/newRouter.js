const { Router } = require("express");
const { messages } = require("./indexRouter");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render('form');
});

newRouter.post("/", (req, res, next) => {
  const { username, message } = req.body
  if (!username || !message) {
    const err = new Error("Username and message are required");
    err.statusCode = 400;
    return next(err);
  }
  messages.push({
    id: messages.length + 1,
    user: username,
    text: message,
    added: new Date(),
  });
    res.redirect("/")
})

module.exports = { newRouter }