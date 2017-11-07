var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = process.env.PORT || 8080;

app.get('/scrape', function(req, res) {
	url = 'https://news.google.com/news/explore/section/q/Assassin%27s%20Creed%3A%20Origins/Assassin%27s%20Creed%3A%20Origins?ned=us&hl=en&gl=US';
	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);

			var text = [];
			var articleLink = [];
			var image = [];
			var news = {text: "", articleLink: "", image: ""};

			$('c-wiz.M1Uqc.kWyHVd').filter(function() {
				text.push($(this).children().first().text());
				articleLink.push($(this).children().first().attr("href"));
				news.text = text;
				news.articleLink = articleLink;
			});

			$('div.qx0yFc').each(function() {
				image.push($(this).find("img").attr("src"));
				news.image = image;
			});
		}

		// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
		// 	console.log('File successfully written! - Check your project directory for the output.json file');
		// });

		res.send(news);
	})
});

app.listen(port, function() {
	console.log('listening on port' + port);
});