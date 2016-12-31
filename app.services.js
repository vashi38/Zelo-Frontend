var app = angular.module("MyApp");

app.service("APIServices",function($http,$state){
	this.getList = function(pageNo,howMany){
		return $http({
			method:'GET',
			url:'https://api.flickr.com/services/rest',
			params:{
				method:'flickr.photos.getRecent',
				per_page:10,
				page:1,
				api_key:'f0bba32a935beb03d38da44ad48f2625',
				format:'json',
				nojsoncallback: 1
			}
		}).then(function(response){
			
			return (response.data);
		});
	}
	
	this.getInfo = function(photoId){
		return $http({
			method:'GET',
			url:'https://api.flickr.com/services/rest',
			params:{
				method:'flickr.photos.getInfo',
				api_key:'f0bba32a935beb03d38da44ad48f2625',
				format:'json',
				photo_id:photoId,
				nojsoncallback: 1
			}
		}).then(function(response){
			return response.data.photo;
		});
	}
});

