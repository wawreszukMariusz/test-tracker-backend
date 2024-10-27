require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const os = require("os"); // Nowy import dla uzyskania adresów IP

const Scenario = require("./models/scenario.model.js");
const scenarioRoute = require("./routes/scenario.route.js");
const TestCase = require("./models/testcase.model.js");
const TestStep = require("./models/teststep.model.js");
const testCaseRoute = require("./routes/testcase.route.js");
const testStepRoute = require("./routes/teststep.route.js");
const projectRoute = require("./routes/project.route.js");
const testExecuteRoute = require("./routes/testexecute.route.js");
const TestExecute = require("./models/testexecute.model.js");
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

app.get("/api/allFromScenarios", async (req, res) => {
  try {
    const scenarioIds = req.query.ids || [];

    // Pobierz scenariusze
    const scenarios = await Scenario.find({ _id: { $in: scenarioIds } }).exec();

    // Pobierz test case'y dla pobranych scenariuszy
    const testCases = await TestCase.find({
      scenarioId: { $in: scenarioIds },
    }).exec();

    // Pobierz test step'y dla pobranych test case'ów
    const testCaseIds = testCases.map((testCase) => testCase._id.toString());
    const testSteps = await TestStep.find({
      testCaseId: { $in: testCaseIds },
    }).exec();

    // Mapowanie danych
    const result = scenarios.map((scenario) => {
      return {
        id: scenario._id,
        scenarioName: scenario.name,
        testcases: testCases
          .filter(
            (testCase) =>
              testCase.scenarioId.toString() === scenario._id.toString()
          )
          .map((testCase) => {
            return {
              id: testCase._id,
              testCaseName: testCase.name,
              teststeps: testSteps
                .filter(
                  (testStep) =>
                    testStep.testCaseId.toString() === testCase._id.toString()
                )
                .map((testStep) => ({
                  id: testStep._id,
                  expected: testStep.expected,
                  result: testStep.result,
                })),
            };
          }),
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Routes
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api/scenarios", scenarioRoute);
app.use("/api/testCases", testCaseRoute);
app.use("/api/testSteps", testStepRoute);
app.use("/api/testExecute", testExecuteRoute);
app.use("/api/project", projectRoute);
