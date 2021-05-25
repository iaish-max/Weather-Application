const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true})); //to use information get from html file(form).

app.get("/" , function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url , function(response){ // to get information from external API.
    // console.log(response.statusCode);

    response.on("data" , function(data){ // to access data which we get from external API.
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDiscription = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;
      const imageIcon = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

      res.write("<h1>Temprature in "+query+" : "+ temp +" degree celcius.</h1>");
      res.write("<p>Weather Discription is : "+ weatherDiscription +".</p>");
      res.write("<img src="+ imageIcon +">");

      res.send();
    });
  });
});



app.listen(3000,function(){
  console.log("Server is running at port 3000");
})
