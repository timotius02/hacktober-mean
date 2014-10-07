//Angular: Factories vs. Service vs. Provider
//src="http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/"

app.factory('myFactory', function($http, $q){
	//Declare private varibles
	var service = {};
	var baseurl = 'https://itunes.apple.com/search?term=';
	var _artist = '';
	var _finalUrl = '';

	//declare private functions
	var makeUrl = function(){
		_artist = _artist.split(' ').join('+');
		_finalUrl = baseurl + _artist + '&callback=JSON_CALLBACK';
		return _finalUrl;
	}

	//declare bounded methods
	service.setArtist = function(artist){
		_artist = _artist;
	}

	service.getArtist = function(){
		return _artist;
	}

	service.callItunes = function(){
		makeUrl();
		var deferred = $q.defer();
		$http({
			method: 'JSONP',
			url: _finalUrl
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject('There was an error');
		})

		return deferred.promise; //returns a promise that resolves when call is returned successfully 
	}

	return service; //returns an object with methods bounded to it

});
