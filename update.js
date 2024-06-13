const dbConnection = require("./mongodb");

async function updateData() {
    const db = await dbConnection();
    const data = await db.updateOne({name: "Ali Raza"}, {$set: {name: "Ali Khan", email: "alikhan@gmail.com"}});
}

updateData();
