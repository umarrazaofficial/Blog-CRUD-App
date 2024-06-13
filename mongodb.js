// this is used when we don't have mongoose

const {MongoClient} = require("mongodb");
const Url = "mongodb://localhost:27017";
const Client = new MongoClient(Url);

async function dbConnection() {
    let Result = await Client.connect();
    let Database = Result.db("US_Collections");
    return Database.collection("Orders");
}

module.exports = dbConnection;
