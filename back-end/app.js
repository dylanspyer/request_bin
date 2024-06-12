const express = require("express");
const app = express();
const port = 3000;
const pgService = require("./utils/pgService");
const { v4: uuidGenerator } = require("uuid");
const { saveRequestInfo, getSpecificRequest } = require("./utils/mongoService");
const cors = require("cors");

app.use(express.static("dist"));
app.use(cors());

function parseRawBody(req, res, next) {
  req.rawBody = "";

  req.on("data", function (chunk) {
    req.rawBody += chunk;
  });

  next();
}

app.use(parseRawBody);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: "text/*" }));
app.use(express.raw({ type: "application/octet-stream" }));

// create a random webhook token to be used as an endpoint
app.post("/api/generateWebhookToken", async (req, res) => {
  let token;
  let uniqueToken;

  do {
    token = uuidGenerator();
    uniqueToken = await pgService.isUniqueToken(token);
  } while (!uniqueToken);

  await pgService.saveWebhookToken(token);

  res.status(200).send({ webHookToken: token });
});

// catch all for recording a webhook trigger of any request type
// save to a database for users to view later
app.all("/api/request/:webhookToken", async (req, res) => {
  const webhookToken = req.params.webhookToken;
  const binId = await pgService.getWebhookToken(webhookToken);

  if (!binId) return res.sendStatus(401);

  const method = req.method;
  const path = req.path.replace(`/api/request/${webhookToken}`, "/");

  const body = Object.keys(req.body).length === 0 ? req.rawBody : req.body;

  const mongoId = await saveRequestInfo(req, path, body);
  // encryptedMongoId = await bcrypt.hash(mongoId, 5);

  await pgService.insertIncomingRequestInfo(path, method, mongoId, binId);

  res.status(200).send("Request information saved successfully");
});

// returns all requests for a given webhook token
app.get("/api/allRequests/:webhookToken", async (req, res) => {
  const webhookToken = req.params.webhookToken;
  const binId = await pgService.getWebhookToken(webhookToken);

  if (!binId) return res.sendStatus(401);

  const allRequestData = await pgService.getAllRequestsForToken(binId);

  res.status(200).send(allRequestData);
});

// returns a specific request from mongo db given the mongo ID
app.get("/api/getSpecificRequest/:mongoId", async (req, res) => {
  const mongoId = req.params.mongoId;
  const specificRequestData = await getSpecificRequest(mongoId);

  if (!specificRequestData) {
    return res.sendStatus(401);
  }

  res.status(200).send(specificRequestData);
});

// deletes a specific request from
app.delete("/api/allRequests/deleteOldRequest/:mongoId", async (req, res) => {
  const mongoId = req.params.mongoId;
  const deleteOldRequest = await pgService.deleteRequest(mongoId);

  // if (!deleteOldRequest) {
  //   return res.sendStatus(401);
  // }

  res.status(202).send(deleteOldRequest);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
