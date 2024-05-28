const express = require("express");
const app = express();
const port = 3000;
const pgService = require("./utils/pgService");
const { v4: uuidGenerator } = require("uuid");
const RequestInfo = require("./models/requestInfo");
const { connectToMongoDB } = require("./utils/mongo-connection");
app.use(express.json());

const pgData = {
  hello1: [
    {
      method: "GET",
      path: "/sample/get/test",
      created_at: "8:56",
      mongo_id: 123,
    },
    {
      method: "POST",
      path: "/sample/get/test",
      created_at: "8:56",
      mongo_id: 122,
    },
  ],
  hello2: [
    {
      method: "GET",
      path: "/sample/get/test",
      created_at: "8:56",
      mongo_id: 121,
    },
    {
      method: "POST",
      path: "/sample/get/test",
      created_at: "8:56",
      mongo_id: 113,
    },
  ],
};

const mongoData = {
  123: { header1: "hi", method: "GET" },
  122: { header1: "hi", method: "GET" },
  121: { header1: "hi", method: "GET" },
  112: { header1: "hi", method: "GET" },
  113: { header1: "hi", method: "GET" },
};

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
  // const webhookToken = req.params.webhookToken;
  // const binId = await pgService.getWebhookToken(webhookToken);

  // if (!binId) return res.status(401);

  await connectToMongoDB();

  const method = req.method;
  const path = req.path;

  const requestInfo = new RequestInfo({
    headers: req.headers,
    path,
    queryParams: req.queryParams,
    body: req.body,
    method: req.method,
  });

  const newRequestInfo = await requestInfo.save();

  console.log("request info: ", requestInfo);
  console.log(newRequestInfo);
  // console.log(req.body);
  // console.log(req.method);
  // console.log(req.query);
  // console.log(`webhookToken ${webhookToken}`);

  res.status(200).send("test");
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
