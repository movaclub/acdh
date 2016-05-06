// acdh (C) 2016
'use strict';
(function(){
	var app = angular.module('acdh', ['ui.router','ngSanitize']);
	app.config(config);
	app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
	app.controller('listArtCtrl',['$scope','$http', '$log', function($scope, $http, $log){
	  $scope.$watchCollection('livesearch',function(val){
		if((typeof(val) !=='undefined' && typeof(val.string) !=='undefined' && typeof(val.itemtype) !=='undefined') && (val.itemtype.length && val.string.length)){
		  	$http.get('/achd/' + val.itemtype + '/lives/' + val.string)
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		} else {
		  	$http.get('/achd/art/last10')
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		}
	  },true);
	}]);
	app.controller('listBibCtrl',['$scope','$http', '$log', function($scope,$http, $log){
	  $scope.$watchCollection('livesearch',function(val){
		if((typeof(val) !=='undefined' && typeof(val.string) !=='undefined' && typeof(val.itemtype) !=='undefined') && (val.itemtype.length && val.string.length)){
		  	$http.get('/achd/' + val.itemtype + '/lives/' + val.string)
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		} else {
		  	$http.get('/achd/bib/last10')
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		}
	  },true);
	}]);
	app.controller('listInsCtrl',['$scope','$http', '$log', function($scope,$http, $log){
	  $scope.$watchCollection('livesearch',function(val){
		if((typeof(val) !=='undefined' && typeof(val.string) !=='undefined' && typeof(val.itemtype) !=='undefined') && (val.itemtype.length && val.string.length)){
		  	$http.get('/achd/' + val.itemtype + '/lives/' + val.string)
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		} else {
		  	$http.get('/achd/ins/last10')
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		}
	  },true);
	}]);
	app.controller('listProCtrl',['$scope','$http', '$log', function($scope,$http, $log){
	  $scope.$watchCollection('livesearch',function(val){
		if((typeof(val) !=='undefined' && typeof(val.string) !=='undefined' && typeof(val.itemtype) !=='undefined') && (val.itemtype.length && val.string.length)){
		  	$http.get('/achd/' + val.itemtype + '/lives/' + val.string)
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		} else {
		  	$http.get('/achd/pro/last10')
			.success(function(data,status,headers,config){
			  $scope.last10 = data.last10;
			  })
			.error(function(response,status,headers,config){ console.log(status); });
		}
	  },true);
	}]);

	function config($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider){
// 		$locationProvider.html5Mode(true).hashPrefix('!');
		$compileProvider.debugInfoEnabled(true);
		$urlRouterProvider.otherwise('/');
	    $stateProvider
	    .state('news',{
	        url: '/news',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/news.html'//,
					//controller: 'listInsCtrl'
	            }
	        }
	    })
	    .state('project',{
	        url: '/project',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/project.html'//,
					//controller: 'listProCtrl'
	            }
	        }
	    })
	    .state('knowmore',{
	        url: '/knowmore',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/knowmore.html'///,
					//controller: 'listBibCtrl'
	            }
	        }
	    })
	    .state('partners',{
	        url: '/partners',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/partners.html'///,
					//controller: 'listBibCtrl'
	            }
	        }
	    })
	    .state('contact',{
	        url: '/contact',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/contact.html'
	            }
	        }
	    })
	    .state('start',{
	        url: '/',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/start.html'
	            }
	        }
	    });
	}
}
)();