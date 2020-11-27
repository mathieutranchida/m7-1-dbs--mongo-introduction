const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    // TODO: connect...
    // TODO: declare 'db'
    // We are using the 'exercises' database
    // and creating a new collection 'greetings'

    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("exercise_1");
    console.log("connected!");

    const result = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, result.insertedCount);

    // close the connection to the database server
    client.close();
    console.log("disconnected!");

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  // TODO: close...
};

const getGreeting = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database
  const db = client.db("exercise_1");
  console.log("connected!");

  const _id = req.params._id;

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    // close the connection to the database server
    client.close();
    console.log("disconnected!");
  });
};

const getGreetings = async (req, res) => {
  // creates a new client
  const client = await MongoClient(MONGO_URI, options);

  // connect to the client
  await client.connect();

  // connect to the database
  const db = client.db("exercise_1");
  console.log("connected!");

  db.collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result) {
        const start = Number(req.query.start) || 0;
        const end = start + Number(req.query.limit) || 25;
        const maxEnd = result.length;
        if (end > result.length) {
          const limitedResult = result.slice(start, maxEnd);
          res.status(200).json({ status: 200, data: limitedResult });
        } else {
          const limitedResult = result.slice(start, end);
          res.status(200).json({ status: 200, data: limitedResult });
        }
      } else {
        res.status(404).json({ status: 404, data: "Not found" });
      }
      client.close();
      console.log("disconnected!");
    });
};

const deleteGreeting = async (req, res) => {
  try {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("exercise_1");
    console.log("connected!");

    const _id = req.params._id;

    const result = await db.collection("greetings").deleteOne({ _id });
    assert.equal(1, result.deletedCount);

    // close the connection to the database server
    client.close();
    console.log("disconnected!");

    res.status(204).json({
      status: 204,
      data: _id,
      message: `${_id} has been deleted from the database`,
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

const updateGreeting = async (req, res) => {
  try {
    // creates a new client
    const client = await MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("exercise_1");
    console.log("connected!");

    const _id = req.params._id;
    const query = { _id };
    const newValues = { $set: { hello: req.body.hello } };

    const result = await db.collection("greetings").updateOne(query, newValues);
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);

    // close the connection to the database server
    client.close();
    console.log("disconnected!");

    res.status(200).json({
      status: 200,
      data: { _id, result },
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
