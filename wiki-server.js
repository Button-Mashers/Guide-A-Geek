var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = process.env.PORT || 8080;

app.get('/scrape', function(req, res) {
	url = 'http://www.imdb.com/title/tt0082495/';
	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);

			var summary;
			var json = {summary: ""};

			$('.summary_text').filter(function() {
				var data = $(this);
				summary = data.text();
				json.summary = summary;
			})
		}

		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
			console.log('File successfully written! - Check your project directory for the output.json file');
		});

		res.send('Check your console!');
	})
});

app.listen(port, function() {
	console.log('listening on port' + port);
});