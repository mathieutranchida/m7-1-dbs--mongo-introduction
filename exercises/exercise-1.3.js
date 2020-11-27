const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("exercise_1");
    console.log("connected!");

    const data = await db.collection("users").find().toArray();
    console.log(data);

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
    res.status(200).json({ status: 200, data: data });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

module.exports = { getUsers };
