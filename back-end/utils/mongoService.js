const RequestInfo = require("../models/requestInfo.js");
const { connectToMongoDB } = require("./mongo-connection");

// Save a request to mongo database
const saveRequestInfo = async (req, path, body) => {
  const requestInfo = new RequestInfo({
    headers: req.headers,
    path: path,
    queryParams: req.query,
    body,
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
  try {
    const requestInfo = await RequestInfo.findById(mongoId);

    return requestInfo;
  } catch (error) {
    console.error(error, "bad mongo id");
    return null;
  }
  // console.log(requestInfo);
};

module.exports = {
  saveRequestInfo,
  getSpecificRequest,
};
