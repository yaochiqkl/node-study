var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url'); //标准库

var cnodeUrl = 'https://cnodejs.org/';

//抓取首页评论的链接
superagent.get(cnodeUrl)
  .end(function(err, res) {
  	if (err) {
  		return console.error(err);
  	}
  	var topicUrls = [];
  	var $ = cheerio.load(res.text);
  	$('#topic_list .topic_title').each(function(index, element) {
  		var $element = $(element);
  		var href = url.resolve(cnodeUrl, $element.attr('href'));
  		topicUrls.push(href);
  	});

  	var ep = new eventproxy();
  	ep.after('topic_html', 3, function(topics) {
  		topics = topics.map(function(topic) {
  			var url = topic[0],
  				html = topic[1],
  				$ = cheerio.load(html);
  			return ({
  				title: $('.topic_full_titile').text().trim(),
  				href: url,
  				comment: $('.reply_content').eq(0).text().trim()
  			});
  		});
  		console.log(topics);
  	});

  	for(var i = 0; i < 3; i++){
  		superagent.get(topicUrls[i])
  		  .end(function(err, res) {
  		  	ep.emit('topic_html', [topicUrls[i], res.text]);
  		  });
  	}
  });

