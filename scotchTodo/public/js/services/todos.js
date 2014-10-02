// js/services/todos.js

angular.module('todoService', [])

	//super simple service
	.factory('Todos', function($http){
		return {
			get : function(){
				return $http.get('/api/todos');
			},
			create : function(todoData){
				console.log(todoData);
				return $http.post('/api/todos', todoData);
			},
			delete : function(id){
				return $http.delete('/api/todos/' + id);
			}
		}
	});