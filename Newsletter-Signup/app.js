const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");
const https = require("https");

const app = express();
//static is needed because bootstrap is loaded remote and css is local
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/23c4e689eb";
  const options = {
    method: "POST",
    auth: "martijn1:0bba5d40349ae15d80c511546e01f0e1-us20"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCde === 200) {
      res.sendFile(__dirname + "/success.html");
    } res.sendFile(__dirname + "/failure.html");

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});
