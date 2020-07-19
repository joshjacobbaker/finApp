// Stock Market Portfolio App By Josh

const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extend: false}))


// API KEY 	pk_1a7ee5b24f76401889c2e3c0e09e55ee
// create call_api function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_1a7ee5b24f76401889c2e3c0e09e55ee', {json: true}, (err, res, body) => {
	if (err) {return console.log(err);}
	//if (res.statuscode === 200) {
		finishedAPI(body);
		//};
	});
};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

// Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
			stock: doneAPI
    	});
	});
});

// Set handlebar index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			//posted_stuff = req.body.stock_ticker;
			res.render('home', {
			stock: doneAPI
    	});
	}, req.body.stock_ticker);
});

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))



app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
