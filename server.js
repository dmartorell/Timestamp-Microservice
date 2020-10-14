// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/timestamp", (req, res) => {
  const unixTime = Date.now();
  const utcTime = new Date(unixTime).toUTCString();
  res.json({ unix: unixTime, utc: utcTime });
});

app.get("/api/timestamp/:date", function(req, res) {
  const isValidDate =
    new Date(+req.params.date).getTime() > 0 ||
    new Date(String(req.params.date)).getTime() > 0;
  
  if(!isValidDate) {
    res.json({"error" : "Invalid Date" })
  }
  if(req.params.date.includes('-')) {
    res.json({unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString()})
  } else {
    res.json({unix: req.params.date, utc: new Date(+req.params.date).toUTCString()})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
