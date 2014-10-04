//server.js

//BASE SETUP

//====================================================================
//imports 
var express = require('express');				//call express
var app = express();							//define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database

var Bear = require('./app/models/bear');

//configure the app to use body-parser
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //set our port

//ROUTES =============================================================
	
var router = express.Router();				//get an instance of the express Router

//middleware to use for all request
router.use(function(req, res, next){
	console.log('Something is happening');
	next(); //make sure we go to the next routes
});


//test route to make sure everything is working
router.get('/', function(req, res){
	res.json({message: 'hooray! welcome to our api!'});
});

//on routes that end in /bears
//------------------------------------------
router.route('/bears')
	//create a bear by by POST request
	.post(function(req, res){

		var bear = new Bear();			//create a new instance of the bear model
		bear.name = req.body.name;		//set the bears name

		bear.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'Bear created!'});
		});

	})

	//get ALL the bears
	.get(function(req, res){
		Bear.find(function(err, bears){
			if(err)
				res.send(err);
			res.json(bears);
		})
	});

router.route('/bears/:bear_id')
	
	//get the bear with that id	
	.get(function(req, res){
		Bear.find(req.params.bear_id, function(err, bear){
			if(err)
				res.send(err);
			res.json(bear);
		})
	})

	//update the bear with this id
	.put(function(req, res){

		//use our bear model to find the bear we want
		Bear.find(req.params.bear_id, function(err, bear){
			if(err)
				res.send(err);

			bear.name = req.body.name; //update the bears info

			//save the bear
			bear.save(function(err){
				if(err)
					res.send(err);

				res.json({ message: 'Bear updated!'});
			})

		});
	})

	//delete the bear with this id
	.delete(function(req, res){
		Bear.remove({_id: req.params.bear_id}, function(err, bear){
			if(err)
				res.send(err);

			res.json({message: 'Successfully deleted'});
		});	
	});

//REGISTER OUR ROUTES ------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//START THE SERVER

app.listen(port);
console.log('Listening to port '+ port);