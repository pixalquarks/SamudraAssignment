import express from "express";
import config from "./config.js";
import { generateToken } from "./util/auth.js";
import createThumbnail from "./util/createthumbnail.js";
import patchJson from "./util/patchjson.js";
import { authenticate } from "./util/auth.js";
import db from "./db/index.js";

const app = express();

app.use(express.json());

const PORT = config.port || 8000;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/login", (req, res) => {
  const data = req.body;
  if (!data.username || !data.password) {
    res.status(400).send({ message: "Missing username or password" });
  } else {
    res.status(200).send({
      token: generateToken(data),
    });
  }
});

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

app.get("/createthumbnail", authenticate, async (req, res) => {
  const url = req.query.url;
  console.log(url);
  if (!url) {
    res.status(400).send({ message: "Missing url" });
  } else {
    try {
      await createThumbnail(url, 50, 50);
      console.log("done creting thumbnail");
      await sleep(500);
      res.status(200).download(process.cwd() + "\\thumbnail.jpeg", (err) => {
        console.log("error" + err);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" + err });
    }
  }
});

app.post("/patchjson", authenticate, (req, res) => {
  const json = req.body.json;
  const patch = req.body.patch;
  console.log(json, patch);
  if (!json || !patch) {
    res.status(400).send({ message: "Missing json or patch" });
  } else {
    try {
      const patched = patchJson(json, patch);
      res.status(200).send({
        patched,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Invalid json or patch" + err });
    }
  }
});

app.post("/adduseraddress", authenticate, async (req, res) => {
  const address = req.body.address;
  if (!address) {
    res.status(400).send({ message: "Missing address" });
  } else {
    try {
      const user = await db.UserAddress.create({
        username: req.user._id,
        address,
      });
      res.status(201).send({ message: "User Address Created", user });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" + err });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
