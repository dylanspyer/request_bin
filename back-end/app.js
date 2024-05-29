const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const pgService = require("./utils/pgService");
const { v4: uuidGenerator } = require("uuid");
app.use(express.json());
const { saveRequestInfo, getSpecificRequest } = require("./utils/mongoService");

// create a random webhook token to be used as an endpoint
app.post("/api/generateWebhookToken", async (req, res) => {
  let token;
  let uniqueToken;

  do {
    token = uuidGenerator();
    uniqueToken = await pgService.isUniqueToken(token);
  } while (!uniqueToken);

  await pgService.saveWebhookToken(token);

  res.status(200).send(token);
});

// catch all for recording a webhook trigger of any request type
// save to a database for users to view later
app.all("/api/request/:webhookToken", async (req, res) => {
  const webhookToken = req.params.webhookToken;
  const binId = await pgService.getWebhookToken(webhookToken);

  if (!binId) return res.status(401);

  const method = req.method;
  const path = req.path.replace(`/api/request/${webhookToken}`, "/");

  const mongoId = await saveRequestInfo(req);
  // encryptedMongoId = await bcrypt.hash(mongoId, 5);

  await pgService.insertIncomingRequestInfo(path, method, mongoId, binId);

  res.status(200).send("Request information saved successfully");
});

// returns all requests for a given webhook token
app.get("/api/allRequests/:webhookToken", async (req, res) => {
  const webhookToken = req.params.webhookToken;
  const binId = await pgService.getWebhookToken(webhookToken);

  if (!binId) return res.status(401);

  const allRequestData = await pgService.getAllRequestsForToken(binId);

  res.status(200).send(allRequestData);
});

// returns a specific request from mongo db given the mongo ID
app.get("/api/getSpecificRequest/:mongoId", async (req, res) => {
  const mongoId = req.params.mongoId;
  const specificRequestData = await getSpecificRequest(mongoId);

  if (!specificRequestData) return res.status(401);

  res.status(200).send(specificRequestData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
