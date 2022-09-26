import express from "express";
import { generateToken } from "./util/auth.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
