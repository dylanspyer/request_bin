require("dotenv").config();

const POSTGRES_URI = process.env.POSTGRES_URI;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  POSTGRES_URI,
  MONGODB_URI,
};
