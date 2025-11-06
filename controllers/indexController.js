const dbQueries = require("../db/queries");

async function showMessageByIdGet(req, res) {
    const id = Number(req.params.id);
    const msg = await dbQueries.dbGetMessageById(id)
    res.render('message', { msg });
}

async function showAllMessagesGet(req, res) {
  res.render('index', { title: 'Mini Messageboard', messages: await dbQueries.dbGetAllMessages() });
}

module.exports = {
  showAllMessagesGet,
  showMessageByIdGet
};