var express = require('expressˇ');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var port = process.env.PORT || 8080;

app.get('/scrape', function(req, res){
	//The URL we will scrape from 
	url = 'http://www.imdb.com/title/tt1229340/';

	//the structure of our request call
	//the first parameter is our URL
	//The callback function takes three parameters, an error, response status code, and the html

	request(url, function(error, response, html){

		//First we'll check no errors occured when making the request

		if(!error){
			//Next we'll utilize the cheerio library on the returned html which basically gives us JQuery functionality

			var $ = cheerio.load(html);

			//Finally, we'll define the variables we're going to capture

			var title, release, rating;
			var json = {title: "", release: "", rating: ""};

			//We'll use the unique header class as a starting point
			$('.header').filter(function(){

				//Lets store the data into a variable so we can easily see whats going on
				var data = $(this);

				//In examining the DOM we notice that the title rests within the first child element of the header tag
				//Utilizing jQuery we can easily navigate and get the text by writing the following code:

				title = data.children().first().text();

				//We will repeat the same process as above. This time we notice that the release is located within the last element
				//writing this code will move us to the exact location of the release year
				release = data.children().last().children().text();

				//Once we have our title, we'll store it in our JSON object
				json.title = title;
				//Saving release year to JSon object
				json.release = release;
			});

			//Since rating is in a different section of the DOM, we'll have to write a new jQuery filter to extarct this information
			$('.star-box-giga-star').filter(function(){
				var data = $(this);

				//The .star-box-giga-star class was exactly where we wanted to it to be
				//To get the rating, you can simple just get the .text(), no need to traverse the DOM any further
				rating = data.text();

				json.rating = rating;
			});
		}

		//To write to the system we will use the built in 'fs' library
		//In this eaxmple we will pass three parameters into the writeFile function
		//Parameter 1: output.json - this is what the created filename will be called
		//Parameter 2: JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
		//Parameter 3: Callback function - a callback function to let us know the status of our function
		fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log('File successfully written!')
			}
		});

		res.send('Check your console!');
	});
});

app.listen(port);
console.log('Server is listening on '+ port);

exports = module.exports = app;