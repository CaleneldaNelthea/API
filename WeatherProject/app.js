const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Linköping&appid=f5fbef6b3c7e965887083dbf64fbb33e&units=metric";
  https.get(url, function(response) {
    console.log(response);
  });
  res.send("Server is up");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
