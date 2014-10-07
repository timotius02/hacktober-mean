//Providers are the only service that can pass into the app.config portion of you application
//important if needing to alter ome of your service before it's available everywhere else in your app

app.provider('myProvider', function(){ //<-- no dependency injection
	//provate variables
	var baseurl = 'https://itunes.apple.com/search?term=';
	var _artist = '';
	var _finalUrl = '';

	//going to set this property on the config function below
	//will be available in app.config
	this.thingFormConfig = '';

	this.makeUrl = function(){
		_artist = _artist.split(' ').join('+');
		_finalUrl = baseurl + _artist + '&callback=JSON_CALLBACK';
		return _finalUrl;
	}

	//the only properties and methods that will be available in your controller are
	//those properties/methods that are returned from $get()
	this.$get = function($http, $q){
		callItunes: function(){
			makeUrl();
			var deferred = $q;
			$http({
				method: 'JSONP', 
				url: _finalUrl
			}).success(function(data){
				deferred.resolve(data);
			}).error(function(){
				deferred.reject('There was an error');
			});	
			return deferred.promise;
		}, 
		setArtist: function(artist){
			_artist = artist;
		}, 
		getArtist: function(){
			return _artist;
		},
		thingOnConfig: this.thingFormConfig
	}
})