require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Scenario = require("./models/scenario.model.js");
const scenarioRoute = require("./routes/scenario.route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database.");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

// Routes
app.use("/api/scenarios", scenarioRoute);
