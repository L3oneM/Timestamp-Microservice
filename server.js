// server.js
// where your node app starts

// https://momentjs.com/
const moment = require('moment');
// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


const parseDate = date => {
	let returnDate;
	// https://momentjs.com/guides/
	const validDate = [
		"MMM D, YYYY",
    "D-MM-YYYY",
    "MMMM D YYYY",
    "MMM D YYYY",
    "YYYY-MM-D",
    "D MMMM YYYY",
    "D MMMM YY",
    "D MMM YYYY",
    "D MMM YY",
    "MMMM D, YYYY",
];
	regex = /^[0-9]+[0-9]$/g;
	if (regex.test(date)) {
		console.log("!")
		let newDate = new Date(+date);
		console.log(newDate, newDate.getTime(), newDate.toUTCString())
		returnDate = {
			"unix": newDate.getTime(),
			"utc" : newDate.toUTCString()
		}
		console.log(returnDate)
	} else if (moment(date,validDate,true).isValid()) {
			let newDate = new Date(date);
			returnDate = {
				"unix": newDate.getTime() ,
				"utc": newDate.toUTCString()
			}
			console.log(returnDate, 3)
	} else {
			returnDate = {
				"error" : "Invalid Date"
			}
		}
	return returnDate;
}

app.get("/api/timestamp/:date_string?", (req, res) => {
	console.log(req.params.date_string);
	res.json(parseDate(req.params.date_string))
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});