const RequestInfo = require("../models/requestInfo");
const { connectToMongoDB } = require("./mongo-connection");

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

const getSpecificRequest = async (mongId) => {
  await connectToMongoDB();
  const requestInfo = await RequestInfo.findById(mongId);

  return requestInfo;
};

module.exports = {
  saveRequestInfo,
  getSpecificRequest,
};
