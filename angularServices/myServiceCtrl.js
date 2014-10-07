app.controller('myServiceCtrl', function($scope, myService){
	$scope.data = {};

	$scope.update = function(){
		myService.setArtist($scope.data.artist);
	}

	$scope.submitArtist = function(){
		myService.callItunes()
			.then(function(data){
				$scope.data.artistData = data;
			}, function(){
				alert(data);
			});

	}
})