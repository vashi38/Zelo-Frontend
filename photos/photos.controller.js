(function(){
	
	'use strinct';
	var app = angular.module("MyApp");

	app.controller("showImages",function($state,APIServices,$window,$timeout,$scope){
		var vm = this;
		var page_no = 100;
		 vm.objects = [];
		vm.done = false;
		
		
		
		
		
		
		vm.loadMore = function(){
			vm.done = false;
			APIServices.getList(page_no++,10).then(function(response) {
			
				newphotos = response.photos.photo;
				newphotos.map(function(pic){
					APIServices.getInfo(pic.id).then(function(photoInfo){
						 angular.extend(pic, {
							'username':photoInfo.owner.realname?photoInfo.owner.realname:'<No Name>',
							'date':new Date(photoInfo.dates.taken),
							'ownerImg':"https://s.yimg.com/pw/images/buddyicon11_m.png#"+pic.owner,
							'ActualImageUrl': "http://farm"+pic.farm+".staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+"_b.jpg",
							'imageUrl': "http://farm"+pic.farm+".staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+"_s.jpg",
							'showOriginal':false,	
							'styleObj':{'opacity':0.2},
							'downloadImage':function() {
								var self = this;
								ele = document.createElement('img');
								ele.src = self.ActualImageUrl;
								ele.onload = function() {
									$scope.$apply(function() {
										self.imageUrl = self.ActualImageUrl;
										angular.extend(self.styleObj, {
											'opacity':1,
											'transition':'opacity 2s'
											});
										
										//self.showOriginal = true;
									})
								};
							}
						});
						pic.downloadImage();
						return pic;
					});	

					
				});
				
				vm.objects = vm.objects.concat(newphotos)
				vm.done = true;
				console.log(vm.objects);
			});
		}
		
		vm.loadMore();
		
		$window.onscroll = function(ev) {
		if (($window.innerHeight + $window.scrollY) >= document.body.scrollHeight) {
		   console.log("Yes");
		   vm.loadMore();
		}
	};
	})
	
}())


