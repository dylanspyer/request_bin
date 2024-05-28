const { MONGODB_URI } = require("./config.js");
const mongoose = require("mongoose");

// This connects us to our mongoDB that is located in mongoDB_uri
const connectToMongoDB = () => {
  mongoose.set("strictQuery", false);

  console.log(`Connecting to ${MONGODB_URI}`);

  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) =>
      console.error("error connecting to MongoDB: ", error.message)
    );
};

module.exports = {
  connectToMongoDB,
};
