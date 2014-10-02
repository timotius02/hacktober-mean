// app/model/todo.js

//load mongoose sicne we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo',{
	text: String,
	done: Boolean
});