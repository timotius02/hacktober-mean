app.controller('myFactoryCtrl', function($scope, myFactory){
	$scope.data = {};

	$scope.updateArtist = function(){
		myFactory.setArtist($scope.data.artist);
	}

	$scope.submitArtist = function(){
		myFactory.callItunes()
			.then(function(data){	//if promise succeeds
				$scope.data.artistData = data;
			}, function(data){	//if promise fails
				alert(data);
			});
	}
});