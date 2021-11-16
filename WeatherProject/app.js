const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

//body parser is needed to go through the body of the post request
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "f5fbef6b3c7e965887083dbf64fbb33e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    //statusCode example 404 not found
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + " degrees Celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
      console.log(weatherData);
    });
    
  });
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
