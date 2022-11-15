/// importing the dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const port = process.env.PORT;
const dburi = process.env.DBURI;

const { Booking } = require("./models/booking");
const { User } = require("./models/user");

mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.post("/auth", async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) {
    return res.sendStatus(401);
  }
  if (req.body.password !== user.password) {
    return res.sendStatus(403);
  }
  res.send({
    token: "secretString",
  });
});

// custom middleware for authorisation
app.use((req, res, next) => {
  console.log(req.headers);
  if (req.headers.authorization === "secretString") {
    next();
  } else {
    res.sendStatus(403);
  }
});

// defining CRUD operations for Bookings
app.get("/", async (req, res) => {
  res.send(await Booking.find());
});

app.post("/", async (req, res) => {
  const newEvent = req.body;
  const event = new Booking(newEvent);
  await event.save();
  res.send({ message: "New event inserted." });
});

app.delete("/:id", async (req, res) => {
  await Booking.deleteOne({ _id: ObjectId(req.params.id) });
  res.send({ message: "Booking removed." });
});

app.put("/:id", async (req, res) => {
  console.log("updating", req.body, req.params.id);
  await Booking.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body);
  res.send({ message: "Booking updated." });
});

// userName
app.get("/user", async (req, res) => {
  res.send(await User.find());
});

app.post("/user", async (req, res) => {
  const newUser = req.body;
  const user = new user(newUser);

  console.log("adding", user, req.body);
  await user.save();
  res.send({ message: "New user inserted." });
});

// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Database connected!");
});
