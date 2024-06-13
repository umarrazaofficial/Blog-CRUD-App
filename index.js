// const fs = require("fs").writeFileSync;
// fs("sample.txt", "Just Testing");

// -------------------------------------------------

// Basic Api Creation
// const data = require("./data");
// const http = require("http");
// http.createServer((req, res) => {
//     res.writeHead(200, {"content-type": "applicationjson"});
//     res.write(JSON.stringify(data));
//     res.end();
// }).listen(4000);

// -------------------------------------------------

// Creating and Removing file from Command Line
// const fs = require("fs");
// const input = process.argv;

// if (input[2] == "add") {
//     fs.writeFileSync(input[3], input[4]);
// } else if (input[2] == "remove") {
//     fs.unlinkSync(input[3]);
// } else {
//     console.log("invalid input");
// }

// -------------------------------------------------

// Performing CRUD Operations

// const fs = require("fs");
// const path = require("path");
// const dirPath = path.join(__dirname, "crud");
// const filePath = `${dirPath}/fruits.txt`;

// fs.writeFileSync(filePath, "apple, orange, grapes, ");
// fs.readFile(filePath, "utf8", (err, items) => {
//     console.log(items);
// });
// fs.appendFile(filePath, "banana, mango", err => {
//     if (!err) {
//         console.log("File Update Successfully");
//     }
// });
// fs.rename(filePath, `${dirPath}/fruitsList.txt`, err => {
//     if (!err) {
//         console.log("File Name Update Successfully");
//     }
// });
// fs.unlinkSync(filePath);

// -------------------------------------------------

// Express Js Basic Example

// const express = require("express");
// const app = express();

// app.get("", (req, res) => {
//     res.send("Hello, this is home page");
// });
// app.get("/service", (req, res) => {
//     res.send("Hello, this is service page");
// });
// app.listen(5000);

// -------------------------------------------------

// Accessing Folder through path

// const express = require("express");
// const app = express();
// const path = require("path");
// const pathfolder = path.join(__dirname, "public");
// app.use(express.static(pathfolder));
// app.listen(5000);

// -------------------------------------------------

// Accessing Folder through path without extension

// const express = require("express");
// const app = express();
// const path = require("path");
// const pathfolder = path.join(__dirname, "public");
// app.get("", (req, res) => {
//     res.sendFile(`${pathfolder}/index.html`);
// });
// app.get("/about", (req, res) => {
//     res.sendFile(`${pathfolder}/about.html`);
// });
// app.get("*", (req, res) => {
//     res.send("This is not a valid page");
// });
// app.listen(5000);

// -------------------------------------------------

// Applying Application-Level Middleware

// const express = require("express");
// const app = express();

// const reqFilter = (req, res, next) => {
//     if (!req.query.age) {
//         res.send("Please Provide age in the url");
//     } else if (req.query.age < 18) {
//         res.send("You must be at least 18 years old to access this website");
//     } else {
//         next();
//     }
// };

// app.use(reqFilter);

// app.get("", (req, res) => {
//     res.send("This is Home Page");
// });
// app.get("/about", (req, res) => {
//     res.send("This is About Page");
// });
// app.get("*", (req, res) => {
//     res.send("This is not a valid page");
// });
// app.listen(5000);

// -------------------------------------------------

// Applying Route-Level Middleware

// const express = require("express");
// const reqFilter = require("./middleware");
// const app = express();

// app.get("", (req, res) => {
//     res.send("This is Home Page");
// });
// app.get("/about", reqFilter, (req, res) => {
//     res.send("This is About Page");
// });
// app.get("*", (req, res) => {
//     res.send("This is not a valid page");
// });

// app.listen(5000);

// -------------------------------------------------

// Connecting MongoDB Basically

// const {MongoClient} = require("mongodb");
// const Url = "mongodb://localhost:27017";
// const Client = new MongoClient(Url);

// async function getData() {
//     let Result = await Client.connect();
//     let Database = Result.db("US_Collections");
//     let Collection = Database.collection("Orders");
//     let Response = await Collection.find({}).toArray();
//     console.log(Response);
// }

// getData();

// -------------------------------------------------

// Creating get API

// const dbConnection = require("./mongodb");

// async function getData() {
//     let data = await dbConnection();
//     let Response = await data.find().toArray();
//     console.log(Response);
// }

// getData();

// -------------------------------------------------

// Starting Learning Mongoose and Practicing CRUD Operations

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/US_Collections");
// const userSchema = new mongoose.Schema({
//     name: String,
//     contact: String,
//     city: String,
//     country: String,
//     email: String,
// });

// const createinDB = async () => {
//     const userModel = await mongoose.model("orders", userSchema);
//     const data = new userModel({
//         name: "Umar Rajput",
//         contact: "03174998620",
//         city: "Lahore",
//         country: "Pakistan",
//         email: "umarsanyara@webevis.com",
//     });
//     const result = await data.save();
//     console.log(result);
// };
// createinDB();

// const updateinDB = async () => {
//     const userModel = await mongoose.model("orders", userSchema);
//     const data = await userModel.updateOne(
//         {
//             name: "Umar Rajput",
//         },
//         {
//             $set: {email: "umarrajput@webevis.com"},
//         }
//     );
//     console.log(data);
// };
// updateinDB();

// const deleteinDB = async () => {
//     const userModel = await mongoose.model("orders", userSchema);
//     const data = await userModel.deleteOne({
//         name: "Umar Rajput",
//         email: "umarsanyara@webevis.com",
//     });
//     console.log(data);
// };
// deleteinDB();

// const findinDB = async () => {
//     const userModel = await mongoose.model("orders", userSchema);
//     const data = await userModel.find({
//         name: "Umar Sanyara",
//     });
//     console.log(data);
// };
// findinDB();

// -------------------------------------------------

const express = require("express");
const user = require("./schemas/userSchema");
const Cors = require("cors");
const account = require("./schemas/accountSchema");
const blog = require("./schemas/blogSchema");
const gallery = require("./schemas/gallerySchema");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
require("./config");

cloudinary.config({
    cloud_name: "umarraza",
    api_key: "268419938443553",
    api_secret: "mKI-ZiXZ1QhaXfLbHC_x0YCoCa4",
});

const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const pathfolder = path.join(__dirname, "./crud-app/build");

const app = express();
app.use(express.json());
app.use(Cors());
app.get("/", (req, res) => {
    res.sendFile(__dirname, `${pathfolder}/index.html`);
});
app.post("/create", async (req, res) => {
    const data = new user(req.body);
    const result = await data.save();
    res.send(data);
});

app.get("/users", async (req, res) => {
    let data = await user.find();
    res.send(data);
});

app.delete("/delete/:_id", async (req, res) => {
    let data = await user.deleteOne(req.params);
    res.send(data);
});

app.put("/update/:id", async (req, res) => {
    let data = await user.updateOne(
        {
            _id: req.params.id,
        },
        {
            $set: req.body,
        }
    );
    res.send(data);
});

app.get("/search/:_id", async (req, res) => {
    let data = await user.findOne(req.params);
    res.send(data);
});

app.get("/find/:key", async (req, res) => {
    let data = await user.find({
        $or: [
            {name: {$regex: req.params.key}},
            {city: {$regex: req.params.key}},
            {email: {$regex: req.params.key}},
            {contact: {$regex: req.params.key}},
        ],
    });
    res.send(data);
});

app.post("/signup", async (req, res) => {
    const data = new account(req.body);
    const result = await data.save();
    res.send(data);
});

app.get("/accounts", async (req, res) => {
    let data = await account.find();
    res.send(data);
});

app.put("/updateaccount/:id", async (req, res) => {
    let data = await account.updateOne(
        {
            _id: req.params.id,
        },
        {
            $set: req.body,
        }
    );
    res.send(data);
});

app.delete("/deleteaccount/:_id", async (req, res) => {
    let data = await account.deleteOne(req.params);
    res.send(data);
});

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await account.findOne(req.body);
        if (user) {
            res.send(user);
        } else {
            res.send("Invalid Email or Password");
        }
    } else {
        res.send("Invalid Email or Password");
    }
});

app.get("/searchaccount/:key", async (req, res) => {
    let data = await account.find({
        $or: [{name: {$regex: req.params.key}}, {email: {$regex: req.params.key}}],
    });
    res.send(data);
});

app.get("/findaccount/:email", async (req, res) => {
    let data = await account.find({
        $and: [{email: {$regex: req.params.email}}],
    });
    res.send(data);
});

//   Blog Api Starts

app.post("/postblog", async (req, res) => {
    const data = new blog(req.body);
    const result = await data.save();
    res.send(result);
});

app.get("/blogs", async (req, res) => {
    let data = await blog.find().populate("author_details");
    res.send(data);
});

app.get("/blog/:_id", async (req, res) => {
    let data = await blog.find({
        author_details: req.params._id,
    });
    res.send(data);
});

app.delete("/deleteblog/:_id", async (req, res) => {
    let data = await blog.deleteOne(req.params);
    res.send(data);
});

app.put("/updateblog/:id", async (req, res) => {
    let data = await blog.updateOne(
        {
            _id: req.params.id,
        },
        {
            $set: req.body,
        }
    );
    res.send(data);
});

app.get("/singleblog/:_id", async (req, res) => {
    let data = await blog.findOne(req.params);
    res.send(data);
});

//   Blog Api Ends

//   Gallery Api Starts

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({error: "No file uploaded"});
        }

        const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.file.buffer.toString("base64")}`);
        if (!result) {
            return res.status(500).json({error: "Failed to upload to Cloudinary"});
        }
        const imageUrl = result.secure_url;

        const data = new gallery({image_url: imageUrl});
        await data.save();
        return res.json({
            success: true,
            data,
            message: "Uploaded Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"});
    }
});
app.get("/images", async (req, res) => {
    let data = await gallery.find();
    res.send(data);
});
app.delete("/deleteimage/:_id", async (req, res) => {
    let data = await gallery.deleteOne(req.params);
    res.send(data);
});

app.listen(5000, () => {
    console.log("Server Running on Port 3000");
});

// -------------------------------------------------

// console.log("Nodemon Running Successfully");
