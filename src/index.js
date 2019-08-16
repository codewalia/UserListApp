const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const PORT = process.env.PORT || 8080;

const CONNECTION_URL =
  "mongodb+srv://waliaan:nana123@cluster0-i3vyr.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "classSyntel";

var app = Express();

app.set("view engine", "ejs");

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

app.get("/home", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.render("home.ejs", { users: result });
  });
});

app.get("/create", (request, response) => {
  response.render("create.ejs");
});

app.get("/update", (request, response) => {
  response.render("update.ejs");
});

app.get("/delete", (request, response) => {
  response.render("delete.ejs");
});

app.post("/create", (req, res) => {
  console.log(req.body);
  collection.insertOne(req.body, (err, res2) => {
    if (err) console.log("some error in inseritng records in databse " + err);
    else console.log("data inserted in the database!");
    res.redirect("/");
  });
});

app.post("/update", (req, res) => {
  console.log(req.body);
  collection.updateOne(
    { name: req.body.name },
    { $set: { name: req.body.user } },
    (err, res2) => {
      if (err) console.log("some error in updating records in databse " + err);
      else console.log("data updated in the database!");
      res.redirect("/");
    }
  );
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  collection.deleteOne({ name: req.body.name }, (err, res2) => {
    if (err) console.log("some error in deleting records in databse " + err);
    else console.log("data deleted in the database!");
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("UserName");
      console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
});
