const pool = require("./pool");

async function dbGetAllMessages() {

  try {
      const { rows } = await pool.query("SELECT * FROM messages");

    return rows;
  } catch (err) {
    return new Error("Error fetching messages from database");
  }
}

async function dbGetMessageById(id) {

  try {
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
    const msg = result.rows[0]; // msg is either the row or undefined

    if (!msg) {
      return new Error(`Message with ID ${id} not found`);
    }

    return msg;
  } catch (err) {
      return new Error(`Message with ID ${id} not found`);
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
  } catch (err) {
    return new Error("Error adding message to database");
  }
}

module.exports = {
  dbGetAllMessages,
  dbGetMessageById,
  addMessage
};
