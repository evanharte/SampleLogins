const { ObjectId } = require("mongodb");
// We need our mongodb connection pool
const dal = require("./m.auth_db.js");
// const dal = require("./pg.auth_db.js");

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

// example curl command to add a user into mongodb:
// curl -d "firstName=Bilbo&lastName=Baggins&username=bilbob" -X POST http://localhost:3000/api/users
async function addUser(
  firstName,
  lastName,
  username
  // gender,
  // smsPhone,
  // profileURL,
  // joinDate,
  // birthDate
) {
  if (DEBUG) console.log("users.mongo.dal.addUser()");
  let newUser = JSON.parse(
    `{"first_name": "${firstName}", "last_name": "${lastName}", "username": "${username}"}`
  );
  try {
    await dal.connect();
    const database = dal.db("Auth");
    const collection = database.collection("users");
    const result = await collection.insertOne(newUser);
    if (DEBUG) console.log(`insertedId: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    if (DEBUG) console.log(`mongo error: ${error.code}`);
    if (error.code === 11000) {
      return error.code;
    }
    // this is where you would record error in event log
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
}

module.exports = {
  getUsers,
  getUserByUserId,
  addUser,
};
