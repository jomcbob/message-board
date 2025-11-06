const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/message/:id", indexController.showMessageByIdGet);
indexRouter.get("/", indexController.showAllMessagesGet);

module.exports = { indexRouter }