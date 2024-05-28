const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const pgService = require("./utils/pgService");
const { v4: uuidGenerator } = require("uuid");
app.use(express.json());
const { saveRequestInfo } = require("./utils/mongoService");

app.get("/", (req, res) => {
  res.send("hello world");
});

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
  const path = req.path;

  const mongoId = await saveRequestInfo(req);
  encryptedMongoId = await bcrypt.hash(mongoId, 5);
  console.log("encrypted id: ", encryptedMongoId);
  await pgService.insertIncomingRequestInfo(
    path,
    method,
    encryptedMongoId,
    binId
  );

  res.status(200);
});

// returns all requests for a given webhook token
app.get("/api/allRequests/:webhookToken", async (req, res) => {
  const webhookToken = req.params.webhookToken;
  const binId = await pgService.getWebhookToken(webhookToken);

  if (!binId) return res.status(401);

  const allRequestData = await pgService.getAllRequestsForToken(binId);
  // some data pull => hello1: [request1, request2, request3]

  res.status(200).send(JSON.stringify(allRequestData));
});

// returns a specific request from mongo db given the mongo ID
app.get("/api/getSpecificRequest/:encryptedMongoId", (req, res) => {
  const encryptedMongoId = req.params.encryptedMongoId;
  const specificRequestData = mongoData[encryptedMongoId];

  res.status(200).send(JSON.stringify(specificRequestData));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
