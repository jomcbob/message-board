const dbQueries = require("../db/queries");

async function showNewMessageFormGet(req, res) {
  res.render('form');
}

async function handleNewMessagePost(req, res, next) {
  const { username, message } = req.body
  if (!username || !message) {
    const err = new Error("Username and message are required");
    err.statusCode = 400;
    return next(err);
  }
    await dbQueries.addMessage(username, message);

    res.redirect("/")
}

module.exports = {
  showNewMessageFormGet,
  handleNewMessagePost
};