const User = require("./models/user.model");
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const port = 4010;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://vivek:XztbrjMuRMKIPQo8@cluster0.9o444.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log(user);
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.status(200).send({ user: token });
  } else {
    return res.status(401).send({
      user: false,
    });
  }
});

app.get("/api/login", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
  } catch (error) {
    console.log(error);
    res.json({ status: 401, error: "invalid token" });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
