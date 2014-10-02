// js/controllers/main.js

angular.module('todoController', [])

	//inject the Todo service factory into our controller
	.controller('mainController', function($scope, $http, Todos){
		$scope.formData = {};
		console.log('init controller');

		//GET ===============================================
		//when landing on the page, get all todos and show them
		//use the service to get all the todos
		Todos.get()
			.success(function(data){
				$scope.todos = data;
			});

		//CREATE ============================================
		//when submitting the add form send the text to the node api
		$scope.createTodo = function(){

			//validate the formData to make sure that something is there
			//If form is empty nothing will happen
			//people can't just hold enter to keep adding the same todo anymore
			if(!$.isEmptyObject($scope.formData)){
				//call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					//if successful creation, call out get function to get all the new todos
					.success(function(data){
						$scope.formData = {}; //clear the form so our user is ready to enter another
						$scope.todos = data; // assign a new list of todos
					})
			}
		};

		//DELETE =============================================
		//delete a todo after checking it
		$scope.deleteTodo = function(id){
			Todos.delete(id)
				//if successfull creation, call our get function to get all the new todos
				.success(function(data){
					$scope.todos = data; // assign a new list of todos
				})
		};
	});