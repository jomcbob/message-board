const dbQueries = require("../db/queries");

    function timeAgo(dateStr) {
      // gives a human-readable "time ago" string i.e "5 min ago", "2 days ago", etc.
      const now = new Date();
      const past = new Date(dateStr);

      const diffMs = now - past;  
      const diffMin = Math.floor(diffMs / 1000 / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHr / 24);
      const diffMonth = Math.floor(diffDay / 30);
      const diffYear = Math.floor(diffDay / 365);

      if (diffMin < 60) return `${diffMin} min ago`;
      if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? 's' : ''} ago`;
      if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
      if (diffMonth < 12) {
        const daysLeft = diffDay % 30;
        if (daysLeft === 0) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
        return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ${daysLeft} day${daysLeft > 1 ? 's' : ''} ago`;
      }
      const remainingMonths = Math.floor((diffDay % 365) / 30);
      if (remainingMonths === 0) return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
      return `${diffYear} year${diffYear > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''} ago`;
    }


async function showMessageByIdGet(req, res) {
    const id = Number(req.params.id);
    const msg = await dbQueries.dbGetMessageById(id)
    res.render('message', { msg, timeAgo });
}

async function showAllMessagesGet(req, res) {
  res.render('index', {
    title: 'Mini Messageboard',
    messages: await dbQueries.dbGetAllMessages(), 
    timeAgo });
}

module.exports = {
  showAllMessagesGet,
  showMessageByIdGet
};