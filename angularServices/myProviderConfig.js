app.config(function(myProviderProvider){
//note that angular appends a 'Provider' to the end of the provider names
	myProviderProvider.thingOnConfig = 'This sentence was set in app.config. Providers are the only service that can be passed into config.'+
		'Check out the code to see how it works.';
});