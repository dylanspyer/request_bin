const { dbQuery } = require("./dbquery");

// Gets webhook token id if it exists
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

// Saves a webhook token into the bins table
const saveWebhookToken = async (webhookToken) => {
  const INSERT_WEBHOOK_TOKEN = "INSERT INTO bins (webhook_token) VALUES ($1)";

  const result = await dbQuery(INSERT_WEBHOOK_TOKEN, webhookToken);

  return result.rowCount > 0;
};

// Gets all the requests for a given bin id
const getAllRequestsForToken = async (binId) => {
  const GET_ALL_REQUESTS =
    "SELECT path, method, created_at, mongo_id as request_id FROM incoming_requests WHERE bin_id = ($1)";

  const result = await dbQuery(GET_ALL_REQUESTS, binId);

  return result.rows;
};

// Insert request information into postgresql
const insertIncomingRequestInfo = async (path, method, mongoId, binId) => {
  const INSERT_REQUEST_INFO =
    "INSERT INTO incoming_requests (path, method, mongo_id, bin_id) VALUES ($1, $2, $3, $4)";

  await dbQuery(INSERT_REQUEST_INFO, path, method, mongoId, binId);
};

// Delete request from postgresql
const deleteRequest = async (mongoId) => {
  const DELETE_REQUEST_INFO =
    "DELETE FROM incoming_requests WHERE mongo_id = $1";

  await dbQuery(DELETE_REQUEST_INFO, mongoId);
};

module.exports = {
  getWebhookToken,
  isUniqueToken,
  saveWebhookToken,
  getAllRequestsForToken,
  insertIncomingRequestInfo,
  deleteRequest
};
