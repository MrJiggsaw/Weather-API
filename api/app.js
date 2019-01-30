const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
var cors = require('cors');

headers = {
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors());


//IqWugQDJLId0anKrGvLPMPYPVe2sPPmh
app.get('/:location' , (request1 , response) => {
	var locationPlace = request1.params.location;
	console.log(locationPlace);
 	const url = 'https://www.mapquestapi.com/geocoding/v1/address?key=IqWugQDJLId0anKrGvLPMPYPVe2sPPmh&inFormat=kvp&outFormat=json&location='+locationPlace+'&thumbMaps=false';
 	var encodedurl = encodeURI(url);
	request(url , (err , res , body) => {
		var data  = JSON.parse(body);
		var latitude = data['results'][0]['locations'][0]['latLng']['lat'];
		var longitude = data['results'][0]['locations'][0]['latLng']['lng'];
		var weatherURL = 'https://samples.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=b6907d289e10d714a6e88b30761fae22'
		request(encodeURI(weatherURL) , (w_err , w_res , w_body) => {
			var weatherData = JSON.parse(w_body);
			var temperature = weatherData['main']['temp'];
			response.json({
				'Latitude' : latitude,
				"longitude" :  longitude,
				'temperature' : {
					"fah" : temperature,
					"cel" : (temperature - 32) * 5/9
				}
			});
		});	
	});
	});

app.listen(port , () => {
	console.log(`Server started at 3000`);
})