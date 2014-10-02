//app/route.js

 var Todo = require('./model/todo');
 //var path = require('path');
 var express = require('express');
 	//api -----------------------------------
 	//get all todos


//routes ===============================================
 module.exports = function(app){
	 app.get('/api/todos', function(req, res){

	 	//use mongoose to get all todos in the database
	 	Todo.find(function(err, todos){

	 		//if there is an error in retrieving, send the error
	 		if(err)
	 			res.send(err);

	 		res.json(todos);//returns all todos in JSON format
	 	});
	 });

	 //create todo and send back all todos after creation
	 app.post('/api/todos', function(req, res){
	 	console.log(req.body);
	 	//create a todo, information comes from AJAX request from Angular
	 	Todo.create({
	 		text : req.body.text,
	 		done : false
	 	}, function(err, todo){
	 		if(err)
	 			res.send(err);

	 		//get and return all the todos after you create another
	 		Todo.find(function(err, todos){
	 			if(err)
	 				res.send(err);
	 			res.json(todos);
	 		});
	 	});
	 });

	//delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo){
			if(err)
				res.send(err);

			//get and return all the todos after you delete one
			Todo.find(function(err, todos){
				if(err)
					res.send(err);
				res.json(todos);
			});
		});
	});

	//application -------------------------------
	// app.get('*', function(req, res){
	// 	res.sendFile('index.html', {
	// 		root: path.join(__dirname, '../public/')
	// 	});
	// });

}

