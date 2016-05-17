// acdh (C) 2016
(function(){
  'use strict';
	var app = angular.module('acdh', ['ui.router','ngSanitize']);
	app.config(config);
	var listURL = {
		'news':		'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=event&pagesize=all&callback=JSON_CALLBACK',		// news & events
		'knowmore':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=biblio&pagesize=all&callback=JSON_CALLBACK',	// know more
		'project':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=project&pagesize=all&callback=JSON_CALLBACK',	// projects
		'partners':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=institution&pagesize=all&callback=JSON_CALLBACK',// partners (have in 'schema:keywords' the tag 'Partner')
		'single':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?callback=JSON_CALLBACK&parameters[nid]='
	};
	app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
	app.controller('singleCtrl',['$scope','$http', '$stateParams', function($scope, $http, $stateParams){
	  var thisURL = listURL['single'] + $stateParams.nID;// console.log('nID: ', $stateParams.nID);
	  $http({
		  method : "GET",
		  url : thisURL
	  }).then(function mySucces(res) {
		  $scope.mySingle = res.data; //console.log('$scope.mySingle: ', $scope.mySingle);
	  }, function myError(res) {
		  $scope.mySingle = res.statusText;
	  });
	}]);

	app.controller('listCtrl',['$scope','$http', '$state', 'getLists', function($scope, $http, $state, getLists){
	  $scope.Model = {};
	  $scope.uiview = {};
	  $scope.uiview.list = false;
	  $scope.uiview.grid = true;
	  var getListPromise = getLists.getListPromise($state.current.name);
	  getListPromise.then(
		function(res){ $scope.Model[$state.current.name] = res.data;  /* console.log($state.current.name + ' $scope.Model: ', $scope.Model); */ },
		function(err){ console.log('err: ', err); }
	  );
	  $scope.onList = function(){
		$scope.uiview.list = true;
		$scope.uiview.grid = false;  console.log('$scope.uiview: ', $scope.uiview);
	  };
	  $scope.onGrid = function(){
		$scope.uiview.list = false;
		$scope.uiview.grid = true;  console.log('$scope.uiview: ', $scope.uiview);
	  };
	}]);
	app.service('getLists', ['$http', '$q', function($http, $q){
	  var deferObject,
	  getList = {
		getListPromise: function(state){console.log('STATE: ', state);
		  var promise = $http.get(listURL[state]);
// 		  var promise = $http.jsonp(listURL[state]);
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
	}]);
	app.filter('findPartner', function() { // for Partner's section (only)
	  return function(items, field) {
			var result = [];
			angular.forEach(items, function(value) {
				if (value.hasOwnProperty('schema:keywords') && value['schema:keywords'][0] == 'Partner') {
					result.push(value);
				}
			});
			return result;
		};
	});
	function config($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider){
		$compileProvider.debugInfoEnabled(true);
		$urlRouterProvider.otherwise('/');
	    $stateProvider
	    .state('s-news',{ // partyDetail({ partyID: id, partyLocation: location })
	        url: '/s-news/:nID',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/s-news.html',
					controller: 'singleCtrl'
	            }
	        }
	    })
	    .state('s-project',{
	        url: '/s-project/:nID',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/s-project.html',
					controller: 'singleCtrl'
	            }
	        }
	    })
	    .state('s-knowmore',{
	        url: '/s-knowmore/:nID',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/s-knowmore.html',
					controller: 'singleCtrl'
	            }
	        }
	    })
	    .state('s-partners',{
	        url: '/s-partners/:nID',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/s-partners.html',
					controller: 'singleCtrl'
	            }
	        }
	    })
	    .state('news',{
	        url: '/news',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/news.html',
					controller: 'listCtrl'
	            }
	        }
	    })
	    .state('project',{
	        url: '/project',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/project.html',
					controller: 'listCtrl'
	            }
	        }
	    })
	    .state('knowmore',{
	        url: '/knowmore',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/knowmore.html',
					controller: 'listCtrl'
	            }
	        }
	    })
	    .state('partners',{
	        url: '/partners',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/partners.html',
					controller: 'listCtrl'
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