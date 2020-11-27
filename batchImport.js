const { MongoClient } = require("mongodb");
const assert = require("assert");
const fs = require("file-system");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database
  const db = client.db("exercise_1");
  console.log("connected!");

  const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));
  const result = await db.collection("greetings").insertMany(greetings);
  assert.equal(greetings.length, result.insertedCount);

  // close the connection to the database server
  client.close();
  console.log("disconnected!");
};

batchImport();
