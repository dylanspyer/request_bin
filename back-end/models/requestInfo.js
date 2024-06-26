const mongoose = require("mongoose");

const requestInfoSchema = new mongoose.Schema({
  headers: {
    type: Object,
  },
  path: {
    type: String,
    required: true,
  },
  queryParams: {
    type: Object,
  },
  body: {
    type: Object,
  },
  method: {
    type: String,
  },
});

requestInfoSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("requestInfo", requestInfoSchema);
