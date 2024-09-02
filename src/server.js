require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// midleware if any

// routes

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running at : ${PORT}`);
});
