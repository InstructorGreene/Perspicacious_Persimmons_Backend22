// /// importing the dependencies
// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const { ObjectId } = require("mongodb");
// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// const port = process.env.PORT;
// const dburi = process.env.DBURI;

// const { Booking } = require("./models/booking");
// const { User } = require("./models/user");

// mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });

// // defining the Express app
// const app = express();

// // adding Helmet to enhance your API's security
// app.use(helmet());

// // using bodyParser to parse JSON bodies into JS objects
// app.use(bodyParser.json());

// // enabling CORS for all requests
// app.use(cors());

// // adding morgan to log HTTP requests
// app.use(morgan("combined"));

// // Auth login function
// app.post("/auth", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.sendStatus(401);
//   }
//   if (req.body.password !== user.password) {
//     return res.sendStatus(403);
//   }
//   user.token = uuidv4();
//   await user.save();
//   res.send({ token: user.token });
// });

// //create user
// app.post("/user", async (req, res) => {
//   const newUser = req.body;
//   const user = new User(newUser);
//   await user.save();
//   res.send({ message: "New account created." });
// });

// // custom middleware for authentication
// app.use(async (req, res, next) => {
//   const user = await User.findOne({ token: req.headers.authorization });
//   if (user) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

// // custom middleware for authorization
// // app.use(async (req, res, next) => {
// //   const authRoles = ["StallHolder", "admin"];
// //   const user = await User.findOne({ authRoles.includes(req.body.role) : req.body.role });
// //   if (user) {
// //     next();
// //   } else {
// //     res.sendStatus(403);
// //   }
// // });

// //get user by id
// app.get("/user/:id", async (req, res) => {
//   await User.find({ _id: req.params.id }, (error, data) => {
//     res.send(data);
//   });
// });
// // defining CRUD operations for Bookings
// app.get("/", async (req, res) => {
//   res.send(await Booking.find());
// });

// app.post("/", async (req, res) => {
//   const newEvent = req.body;
//   const event = new Booking(newEvent);
//   await event.save();
//   res.send({ message: "New event inserted." });
// });

// app.delete("/:id", async (req, res) => {
//   await Booking.deleteOne({ _id: ObjectId(req.params.id) });
//   res.send({ message: "Booking removed." });
// });

// app.put("/:id", async (req, res) => {
//   await Booking.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body);
//   res.send({ message: "Booking updated." });
// });

// //
// // starting the server
// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function callback() {
//   console.log("Database connected!");
// });

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

// Auth login function
app.post("/auth", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.sendStatus(401);
  }
  if (req.body.password !== user.password) {
    return res.sendStatus(403);
  }
  user.token = uuidv4();
  await user.save();
  res.send({ token: user.token });
});

//create user
app.post("/user", async (req, res) => {
  const newUser = req.body;
  const user = new User(newUser);
  await user.save();
  res.send({ message: "New account created." });
});

// custom middleware for authentication
app.use(async (req, res, next) => {
  const user = await User.findOne({ token: req.headers.authorization });
  if (user) {
    next();
  } else {
    res.sendStatus(403);
  }
});
// custom middleware for authorization
// app.use(async (req, res, next) => {
//   const authRoles = ["StallHolder", "admin"];
//   const user = await User.findOne({ authRoles.includes(req.body.role) : req.body.role });
//   if (user) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

//get user by id
app.get("/user/:id", async (req, res) => {
  await User.find({ _id: req.params.id }, (error, data) => {
    res.send(data);
  });
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
  await Booking.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body);
  res.send({ message: "Booking updated." });
});

//
// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Database connected!");
});
