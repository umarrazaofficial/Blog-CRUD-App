const express = require("express");
const dbConnection = require("./mongodb");
const Cors = require("cors");
const app = express();

const {ObjectId} = require("mongodb");

app.use(express.json());
app.use(Cors());

app.get("/", async (req, res) => {
    let db = await dbConnection();
    let data = await db.find().toArray();
    res.send(data);
});

app.post("/", async (req, res) => {
    let db = await dbConnection();
    let data = await db.insertMany(req.body);
    res.send("user added successfully");
});

app.put("/:id", async (req, res) => {
    let db = await dbConnection();
    let data = await db.updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body});
    res.send(data);
});

app.delete("/:id", async (req, res) => {
    let db = await dbConnection();
    let data = await db.deleteOne({_id: new ObjectId(req.params.id)});
    res.send(data);
});

app.listen(5000);
