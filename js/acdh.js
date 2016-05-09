// acdh (C) 2016
<<<<<<< HEAD
(function(){
  'use strict';
	var app = angular.module('acdh', ['ui.router','ngSanitize']);
	app.config(config);
	var listURL = {
		'knowmore':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=biblio',
		'project':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=project',
		'dha_page':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=dha_page',
		'partners':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=institution'
	};
	app.controller('listCtrl',['$scope','$http', '$state', 'getLists', function($scope, $http, $state, getLists){
	  $scope.Model = {};
	  var getListPromise = getLists.getListPromise($state.current.name);
	  getListPromise.then(
		function(res){
		  $scope.Model[$state.current.name] = res.data;  // console.log($state.current.name + ' $scope.Model: ', $scope.Model);
		},
		function(err){ console.log('err: ', err); }
	  );
	}]);
	app.service('getLists', ['$http', '$q', function($http, $q){
	  var deferObject,
	  getList = {
		getListPromise: function(state){console.log('STATE: ', state);
		  var promise = $http.get(listURL[state]);
		  // deferObject =  deferObject || $q.defer(); // this one is needed when we need to cache the state data set (!), and not when we need to refresh data set for every state changed
		  deferObject =  $q.defer();
		  promise.then(
			function(resp){ deferObject.resolve(resp); /*console.log('$state: ', $state);*/ },
			function(errr){ deferObject.reject(errr); /*console.log('errr$state: ', $state);*/ }
		  );
		  return deferObject.promise;
		}
	  };
	  return getList;
=======
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
>>>>>>> 13ce78a14ffbce57053cd71c2e3c17908a979768
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
<<<<<<< HEAD
	        url: '^/project',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/project.html',
					controller: 'listCtrl'/*,
					resolve:{
					  'myList':function(getLists){return getLists.promise;}
					}*/
=======
	        url: '/project',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/project.html'//,
					//controller: 'listProCtrl'
>>>>>>> 13ce78a14ffbce57053cd71c2e3c17908a979768
	            }
	        }
	    })
	    .state('knowmore',{
<<<<<<< HEAD
	        url: '^/knowmore',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/knowmore.html',
					controller: 'listCtrl'/*,
					resolve:{
					  'myList':function(getLists){return getLists.promise;}
					}*/
=======
	        url: '/knowmore',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/knowmore.html'///,
					//controller: 'listBibCtrl'
>>>>>>> 13ce78a14ffbce57053cd71c2e3c17908a979768
	            }
	        }
	    })
	    .state('partners',{
	        url: '/partners',
	        views: {
	            'content@': {
<<<<<<< HEAD
	                templateUrl: '/acdh/js/views/partners.html',
					controller: 'listCtrl'/*,
					resolve:{
					  'myList':function(getLists){return getLists.promise;}
					}*/
=======
	                templateUrl: '/acdh/js/views/partners.html'///,
					//controller: 'listBibCtrl'
>>>>>>> 13ce78a14ffbce57053cd71c2e3c17908a979768
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