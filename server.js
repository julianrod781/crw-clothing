const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const path = require("path");
const dotenv = require("dotenv");
const enforce = require("express-sslify");
if (process.env.NODE_ENV !== "production") dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server is running on port" + port);
});

// const logRequestStart = (req, res, next) => {
//   console.info(`${req.method} ${req.originalUrl}`);
//   next();
// };

// app.use(logRequestStart);

app.get("/server.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

app.post("/payment", (req, res) => {
  console.log(req);

  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
