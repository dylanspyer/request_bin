const config = require("./config.js");
const { Client } = require("pg");

const logQuery = (statement, parameters) => {
  const timestamp = new Date();
  const formattedTimeStamp = timestamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

const isProduction = config.NODE_ENV === "production";
const CONNECTION = {
  connectionString: config.POSTGRES_URI,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  // ssl: { rejectUnauthorized: false },
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    const client = new Client(CONNECTION);

    await client.connect();
    logQuery(statement, parameters);
    const result = await client.query(statement, parameters);
    await client.end();

    return result;
  },
};
