const { dbQuery } = require("./dbquery");

// gets webhookToken exists
const getWebhookToken = async (webhookToken) => {
  const SELECT_WEBHOOK_TOKEN = "SELECT id FROM bins WHERE webhook_token = $1";

  const result = await dbQuery(SELECT_WEBHOOK_TOKEN, webhookToken);

  if (result.rowCount === 0) return false;

  return result.rows[0].id;
};

// If token is a unique token, it returns true, else false
const isUniqueToken = async (webhookToken) => {
  const SELECT_WEBHOOK_TOKEN = "SELECT id FROM bins WHERE webhook_token = $1";

  const result = await dbQuery(SELECT_WEBHOOK_TOKEN, webhookToken);

  return result.rowCount === 0;
};

const saveWebhookToken = async (webhookToken) => {
  const INSERT_WEBHOOK_TOKEN = "INSERT INTO bins (webhook_token) VALUES ($1)";

  const result = await dbQuery(INSERT_WEBHOOK_TOKEN, webhookToken);

  return result.rowCount > 0;
};

const getAllRequestsForToken = async (binId) => {
  const GET_ALL_REQUESTS =
    "SELECT path, method, created_at, mongo_id as request_id FROM incoming_requests WHERE bin_id = ($1)";

  const result = await dbQuery(GET_ALL_REQUESTS, binId);

  return result.rows;
};

// validate that webhookTokeExists
// save webhookToken to database
// get all the requests for a webhook token

module.exports = {
  getWebhookToken,
  isUniqueToken,
  saveWebhookToken,
  getAllRequestsForToken,
};
