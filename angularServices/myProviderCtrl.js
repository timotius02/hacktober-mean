app.controller('myProviderCtrl', function($scope, myProvider){
	$scope.data = {};

	$scope.updateArtist = function(){
		myProvider.setArtist($scope.data.artist);
	}

	$scope.submitArtist = function(){
		myProvider.callItunes()
			.then(function(data){	//if promise succeeds
				$scope.data.artistData = data;
			}, function(data){	//if promise fails
				alert(data);
			});
	}

	$scope.thingFromConfig = myProvider.thingOnConfig;
});