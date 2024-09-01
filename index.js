require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const os = require("os"); // Nowy import dla uzyskania adresów IP

const Scenario = require("./models/scenario.model.js");
const scenarioRoute = require("./routes/scenario.route.js");
const TestCase = require("./models/testcase.model.js");
const testCaseRoute = require("./routes/testcase.route.js");
const testStepRoute = require("./routes/teststep.route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database.");

    app.listen(process.env.PORT || 3000, () => {
      const port = process.env.PORT || 3000;
      const networkInterfaces = os.networkInterfaces();
      const addresses = [];

      for (const iface of Object.values(networkInterfaces)) {
        for (const ifaceDetail of iface) {
          if (ifaceDetail.family === "IPv4" && !ifaceDetail.internal) {
            addresses.push(ifaceDetail.address);
          }
        }
      }

      console.log(`Server is running on port ${port}`);
      if (addresses.length > 0) {
        console.log(
          `Available at the following IP addresses: ${addresses.join(", ")}`
        );
      } else {
        console.log("No external IP addresses found.");
      }
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

// Routes
app.use("/api/scenarios", scenarioRoute);
app.use("/api/testCases", testCaseRoute);
app.use("/api/testSteps", testStepRoute);
