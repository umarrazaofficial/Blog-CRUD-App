const dbConnection = require("./mongodb");

async function insertData() {
    const Collection = await dbConnection();
    const data = await Collection.insertOne({
        name: "Abc",
        contact: 3241471748,
        city: "Lahore",
        country: "Pakistan",
        email: "abc@webevis.com",
    });
}

insertData();
