const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName) => {
  const client = await MongoClient(MONGO_URI, options);

  console.log(dbName);

  // connect to the client
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db(dbName);
  console.log("connected!");

  const data = await db.collection("users").find().toArray();
  console.log(data);

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

console.log(getCollection("exercise_1"));
