const pool = require("./pool");

async function dbGetAllMessages() {
  try {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
  } catch (err) {
    console.error(err)
    return []
  }
}


async function dbGetMessageById(id) {
  try {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result.rows[0] || null; // return null if not found
  } catch (err) {
    console.error(err);
    return null;
  }
}


async function addMessage(username, message) {
  try {
    const created_at = new Date();
    const res = await pool.query(
      `INSERT INTO messages (username, message, created_at)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [username, message, created_at]
    );
    console.log("New message added:", res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error("Error adding message to database:", err);
    throw err;
  }
}

module.exports = {
  dbGetAllMessages,
  dbGetMessageById,
  addMessage
};
