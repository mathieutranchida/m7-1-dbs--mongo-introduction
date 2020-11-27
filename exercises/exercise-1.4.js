const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  try {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("exercise_1");
    console.log("connected!");

    const user = await db
      .collection("users")
      .insertOne({ name: req.body.name });

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
    res.status(201).json({ status: 201, data: user.ops[0] });
  } catch {
    res.status(500).json({ status: 200, error: error.message });
  }
};

module.exports = { addUser };
