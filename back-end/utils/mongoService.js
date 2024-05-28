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

module.exports = {
  saveRequestInfo,
};
