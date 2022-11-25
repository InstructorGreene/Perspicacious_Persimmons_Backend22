/// importing the dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://carnival-app.onrender.com"],
  })
);

// adding morgan to log HTTP requests
app.use(morgan("combined"));

//get user by email
app.get("/user/:email", async (req, res) => {
  res.send(await User.find({ email: req.params.email }));
});

//create user
app.post("/user", async (req, res) => {
  const newUser = req.body;
  const user = new User(newUser);
  await user.save();
  res.send({ message: "New account created." });
});

// Auth login function
app.post("/auth", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.sendStatus(401);
  }
  if (req.body.password !== user.password) {
    return res.sendStatus(403);
  }
  user.token = uuidv4();
  await user.save();
  res.send({
    token: user.token,
    role: user.role,
    userid: user._id,
  });
});

// custom middleware for authentication
// there is a user in the db, that matches the req header token
app.use(async (req, res, next) => {
  const user = await User.findOne({ token: req.headers.authorization });
  if (user) {
    next();
  } else {
    res.sendStatus(403);
  }
});

//all users may view bookings, but with different filters
app.get("/", async (req, res) => {
  res.send(await Booking.find());
});

// custom middleware for StallHolder or Admin authorization
app.use(async (req, res, next) => {
  const user = await User.findOne({ token: req.headers.authorization });
  if (user.role === "StallHolder" || user.role === "admin") {
    next();
  } else {
    return res.sendStatus(401);
  }
});

//get booking by userId
app.get("/:userid", async (req, res) => {
  res.send(await Booking.find({ userid: req.params.userid }));
  console.log(req);
});

// add Bookings
app.post("/", async (req, res) => {
  const newBooking = req.body;
  const booking = new Booking(newBooking);
  await booking.save();
  res.send({ message: "New booking created." });
});

//edit Booking
app.put("/:id", async (req, res) => {
  await Booking.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body);
  res.send({ message: "Booking updated." });
});

// custom middleware for admin authorization
app.use(async (req, res, next) => {
  const user = await User.findOne({ token: req.headers.authorization });
  if (user.role === "admin") {
    next();
  } else {
    return res.sendStatus(401);
  }
});

//Delete Booking
app.delete("/:id", async (req, res) => {
  //added these codes to delete the
  // booking anly if it is an admin
  const user = await User.findOne({ token: req.headers.authorization });
  console.log(user.role, user._id);
  if (user.role === "admin") {
    await Booking.deleteOne({ _id: ObjectId(req.params.id) });
    res.send({ message: "Booking removed." });
  }
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
