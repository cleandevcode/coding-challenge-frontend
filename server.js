const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const pino = require("express-pino-logger")();
const fs = require("fs");
const d3 = require("d3-array");
const app = express();

const port = process.env.PORT || 3001;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(pino);
app.use(express.static(__dirname + "/build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  const jsonLogs = JSON.parse(fs.readFileSync("./json-data/logs.json"));
  const jsonAgents = JSON.parse(fs.readFileSync("./json-data/agents.json"));
  const groupData = Array.from(
    d3.group(jsonLogs, d => d.number),
    ([key, value]) => ({
      key,
      value
    })
  );
  const result = groupData.map(item => {
    const lastLog = item.value[d3.maxIndex(item.value, d => d.dateTime)];
    const lastCallAgent = jsonAgents.find(
      i => i.identifier == lastLog.agentIdentifier
    );
    return {
      label: item.key,
      value: item.value.length,
      name: lastCallAgent.firstName + " " + lastCallAgent.lastName,
      agentID: lastLog.agentIdentifier,
      displayvalue:
        "Phone: <b>" +
        item.key +
        "</b><br />" +
        "Counts: <b>" +
        item.value.length +
        "</b>",
      tooltext:
        "Last Agent Name: <b>" +
        lastCallAgent.firstName +
        " " +
        lastCallAgent.lastName +
        "</b><br /><br />" +
        "Last Date: " +
        "<b>" +
        new Date(lastLog.dateTime).toUTCString() +
        "</b>"
    };
  });
  res.send(
    JSON.stringify({
      data: result
    })
  );
});

app.get("/agent", (req, res) => {
  const agentId = req.query.id;
  const jsonLogs = JSON.parse(fs.readFileSync("./json-data/logs.json"));
  const jsonResolution = JSON.parse(
    fs.readFileSync("./json-data/resolution.json")
  );
  const agentLogs = jsonLogs.filter(item => item.agentIdentifier == agentId);
  const result = agentLogs.map(item => {
    return {
      phone: item.number,
      dateTime: new Date(item.dateTime).toUTCString(),
      resolution: jsonResolution.find(i => i.identifier == item.identifier)
        .resolution
    };
  });
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      data: result
    })
  );
});

app.get("/call", (req, res) => {
  const phoneNumber = req.query.number;
  const jsonLogs = JSON.parse(fs.readFileSync("./json-data/logs.json"));
  const jsonResolution = JSON.parse(
    fs.readFileSync("./json-data/resolution.json")
  );
  const jsonAgents = JSON.parse(fs.readFileSync("./json-data/agents.json"));
  const agentLogs = jsonLogs.filter(item => item.number.includes(phoneNumber));
  const result = agentLogs.map(item => {
    const agent = jsonAgents.find(i => i.identifier == item.agentIdentifier);
    return {
      value: agent.firstName + " " + agent.lastName,
      dateTime: new Date(item.dateTime).toUTCString(),
      resolution: jsonResolution.find(i => i.identifier == item.identifier)
        .resolution
    };
  });

  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      data: result
    })
  );
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => console.log(`Express server is running on  :${port}`));
