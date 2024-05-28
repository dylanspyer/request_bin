const RequestInfo = require("../models/requestInfo");
const { connectToMongoDB } = require("./mongo-connection");

// Save a request to mongo database
const saveRequestInfo = async (req) => {
  const requestInfo = new RequestInfo({
    headers: req.headers,
    path: req.path,
    queryParams: req.queryParams,
    body: req.body,
    method: req.method,
  });

  await connectToMongoDB();
  const result = await requestInfo.save();
  const mongoId = result._id.toString();

  return mongoId;
};

// Gets information about a specific request given its mongo id
const getSpecificRequest = async (mongoId) => {
  await connectToMongoDB();
  const requestInfo = await RequestInfo.findById(mongoId);

  return requestInfo;
};

module.exports = {
  saveRequestInfo,
  getSpecificRequest,
};
