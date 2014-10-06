// public/src/js/TestService.js

angular.module('TestService', [])

.factory('Test', ['$http', function($http){
	return {
		get : function(){
			//return something
		}
	};
}]);