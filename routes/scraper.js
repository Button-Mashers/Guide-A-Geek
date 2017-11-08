var express = require('express');
var request = require('request-promise');
var cheerio = require('cheerio');
var app = express();
var port = process.env.PORT || 8080;

	var obj = {
		scrape: function() {
			var options = {
				uri: 'https://news.google.com/news/explore/section/q/Assassin%27s%20Creed%3A%20Origins/Assassin%27s%20Creed%3A%20Origins?ned=us&hl=en&gl=US',
				transform: function(body) {
					return cheerio.load(body);
				}
			}

			return request(options) 
			.then(function($) {
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
			})
		}
	}

module.exports = obj;