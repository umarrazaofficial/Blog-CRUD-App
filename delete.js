const dbConnection = require("./mongodb");

const deleteData = async () => {
    const db = await dbConnection();
    const data = await db.deleteOne({email: "abc@webevis.com"});
    if (data.acknowledged) {
        console.log("data deleted succeessfully");
    }
};

deleteData();
