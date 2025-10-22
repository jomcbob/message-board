const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


indexRouter.get("/message/:id", (req, res) => {
  const id = Number(req.params.id);
  const msg = messages.find(m => m.id === id);

  res.render("message", { msg });
});


indexRouter.get("/", (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

module.exports = {indexRouter, messages}