var app = angular.module("MyApp");

app.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.
	state('photos',{
		url:'/photos',
		templateUrl:'photos/photos.html',
		controller:'showImages',
		controllerAs:'images'
	});
	$urlRouterProvider.otherwise('/photos');
	
});