const { ObjectId } = require("mongodb");
// We need our mongodb connection pool
const dal = require("./m.auth_db.js");

async function getUsers() {
  if (DEBUG) console.log("Auth.mongo.dal.getUsers()");
  try {
    // connect to the mongo database
    await dal.connect();
    // fetch the data into a cursor
    const cursor = dal.db("Auth").collection("users").find();
    // I need ALL the data into an array
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    // this is where you write to the event log
    console.log(error);
    // throw error;
  } finally {
    // release the database connection back into the pool
    dal.close();
  }
}

async function getUserByUserId(id) {
  if (DEBUG) console.log("Auth.mongo.dal.getUserByUserId()");
  try {
    await dal.connect();
    const database = dal.db("Auth");
    const collection = database.collection("users");
    const result = await collection.find({ _id: new ObjectId(id) }).toArray();
    if (DEBUG) console.log(result[0]);
    return result[0];
  } catch (error) {
    console.error("Error occurred while fetching data from MongoDB:", error);
    // throw error;
  } finally {
    dal.close();
  }
}

module.exports = {
  getUsers,
  getUserByUserId,
};