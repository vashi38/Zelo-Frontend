(function(){
	
	'use strinct';
	var app = angular.module("MyApp");

	app.controller("showImages",function($state,APIServices,$window,$timeout){
		var vm = this;
		var page_no = 100;
		 vm.objects = [];
		var photoList = [];
		vm.done = false;
		
		vm.loadMore = function(){
			vm.done = false;
				APIServices.getList(page_no++,10).then(function(response){
				photoList = photoList.concat(response.photos.photo);
				
				photoList.map(function(pic){
					APIServices.getInfo(pic.id).then(function(photoInfo){
						return angular.extend(pic,{
							'username':photoInfo.owner.realname?photoInfo.owner.realname:'<No Name>',
							'date':new Date(photoInfo.dates.taken),
							'ownerImg':"https://s.yimg.com/pw/images/buddyicon11_m.png#"+pic.owner,
							'imageUrl': "http://farm"+pic.farm+".staticflickr.com/"+pic.server+"/"+pic.id+"_"+pic.secret+"_n.jpg"
						})
					})
				});
				vm.objects = photoList;
				vm.done = true;
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


