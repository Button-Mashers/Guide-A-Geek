var express = require('express');
var fs = require('fs');
var axios = require('axios');
var request = require('request-promise');
var cheerio = require('cheerio');
var app = express();
var port = process.env.PORT || 8080;

// app.get('/scrape', function(req, res) {
	var obj = {
		scrape: function() {
			var url = 'https://news.google.com/news/explore/section/q/Assassin%27s%20Creed%3A%20Origins/Assassin%27s%20Creed%3A%20Origins?ned=us&hl=en&gl=US';
			request(url) 
			.then(function(error, response, html) {
				if(!error) {
					var $ = cheerio.load(html);

					var text = [];
					var articleLink = [];
					var image = [];
					var news = {text: "", articleLink: "", image: ""};

					$('c-wiz.M1Uqc.kWyHVd').filter(function() {
						text.push($(this).children().first().text());
						articleLink.push($(this).children().first().attr("href"));
					});
					news.text = text;
					news.articleLink = articleLink;

					$('div.qx0yFc').each(function() {
						image.push($(this).find("img").attr("src"));
					});
					news.image = image;

					console.log(news);
					return news;
				}
				else {
					console.log(error);
				}
			})
		}
	}
// });
module.exports = obj;