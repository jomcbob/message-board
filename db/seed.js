require('dotenv').config();
const { Client } = require("pg");
let dbQueries =  require('./queries');

const messages = [
  { id: 1, message: "Hi there!", username: "Amando", created_at: new Date() },
  { id: 2, message: "Hello World!", username: "Charles", created_at: new Date() }
];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log("seeding messages...");
  const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required for Railway
});


  try {
    await client.connect();
    await client.query(SQL);

    // Clear old data (optional)
    await client.query("DELETE FROM messages;");
    // Reset ID sequence to 1
    await client.query("ALTER SEQUENCE messages_id_seq RESTART WITH 1;");

    // Insert the messages array
    for (const msg of messages) {
      await client.query(
        `INSERT INTO messages (message, username, created_at)
         VALUES ($1, $2, $3);`,
        [msg.message, msg.username, msg.created_at]
      );
    }

    console.log("done inserting messages");
    console.log(await dbQueries.dbGetAllMessages());
  } catch (err) {
    console.error("Error seeding messages:", err);
  } finally {
    await client.end();
  }
}

main();
