const { Router } = require("express");
const newController = require("../controllers/newController");
const newRouter = Router();

newRouter.get("/", newController.showNewMessageFormGet);
newRouter.post("/", newController.handleNewMessagePost);

module.exports = { newRouter }