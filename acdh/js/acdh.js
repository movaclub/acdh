// acdh (C) 2016
(function(){
  'use strict';
	var app = angular.module('acdh', ['ui.router','ngSanitize']);
	app.config(config);
	var listURL = {
		'newsevents':	'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=event&pagesize=all&callback=JSON_CALLBACK',		// news & events
		'knowmore':		'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=biblio&pagesize=all&callback=JSON_CALLBACK',	// know more
		'projects':		'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=project&pagesize=all&callback=JSON_CALLBACK',	// projects
		'partners':		'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=institution&pagesize=all&callback=JSON_CALLBACK',// partners (in 'schema:keywords' tag 'Partner')
		'single':		'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?callback=JSON_CALLBACK&parameters[nid]=',
		'start':		'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?callback=JSON_CALLBACK&parameters[field_tags]=214', // inc. front page entries
		'contact': 		'https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?callback=JSON_CALLBACK&parameters[nid]=165'
	};
	app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
	app.controller('acdhNav',['$scope', '$http', 'getMenu', function($scope, $http, getMenu){
	  $scope.Model = {};
	  var getMenuPromise = getMenu.getMenuPromise(listURL['start']);
	  getMenuPromise.then(
		function(res){
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
			  res.data[i]['headline'] = res.data[i]['schema:headline'];
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['description'] = res.data[i]['schema:description'];
			  res.data[i]['description'] = res.data[i]['description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['description'] = res.data[i]['description'].substring(0,55);
			  res.data[i]['description'] = res.data[i]['description'] + '...';
			}
		  }
		  $scope.Model['start'] = res.data;
		},
		function(err){ console.log('err acdhNav: ', err); }
	  );
	}]);
	app.controller('contactCtrl',['$scope','$http', '$stateParams' , function($scope, $http){
	  var thisURL = listURL['contact'];
	  $http({
		  method : "GET",
		  url : thisURL
	  }).then(function mySucces(res) {
		  $scope.mySingle = res.data;
	  }, function myError(res) {
		  $scope.mySingle = res.statusText;
	  });
	}]);
	app.controller('singleCtrl',['$scope','$http', '$stateParams' , function($scope, $http, $stateParams){
	  var thisURL = listURL['single'] + $stateParams.nID;// console.log('nID: ', $stateParams.nID);
	  $http({
		  method : "GET",
		  url : thisURL
	  }).then(function mySucces(res) {
		  $scope.mySingle = res.data;
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
		function(res){ $scope.Model[$state.current.name] = res.data;   console.log($state.current.name + ' $scope.Model: ', $scope.Model);  },
		function(err){ console.log('err: ', err); }
	  );
	  $scope.onList = function(){
		$scope.uiview.list = true;
		$scope.uiview.grid = false;  //console.log('$scope.uiview: ', $scope.uiview);
	  };
	  $scope.onGrid = function(){
		$scope.uiview.list = false;
		$scope.uiview.grid = true;  //console.log('$scope.uiview: ', $scope.uiview);
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
	app.service('getMenu', ['$http', '$q', function($http, $q){
	  var deferObject,
	  getMenu = {
		getMenuPromise: function(url){
		  var promise = $http.get(url);
		  deferObject =  deferObject || $q.defer();
		  deferObject =  $q.defer();
		  promise.then(
			function(resp){ deferObject.resolve(resp); /*console.log('resp getMenu: ', resp);*/ },
			function(errr){ deferObject.reject(errr); console.log('errr getMenu: ', errr); }
		  );
		  return deferObject.promise;
		}
	  };
	  return getMenu;
	}]);
	app.filter('findContact', function() { // for contact's section
	  return function(items, field) {
			var result = [];
			angular.forEach(items, function(value) {
				if (value.hasOwnProperty('schema:headline') && value['schema:headline'] == 'Contact') {
					result.push(value); console.log('findContact result: ',result);
				}
			});
			return result;
		};
	});
	app.filter('findPartner', function() { // for Partner's section
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
	app.filter('findMenu', function() { // for menu
	  return function(items, field) {
			var result = [];
			angular.forEach(items, function(value) {
				if (value.hasOwnProperty('schema:keywords') && value['schema:keywords'].indexOf('_menu') != -1) {
					result.push(value);
				}
			});
			return result;
		};
	});
	app.filter('startMenu', function() { // for start page
	  return function(items, field) {
			var result = [];
			angular.forEach(items, function(value) {
				if (value.hasOwnProperty('schema:keywords') && value['schema:keywords'].indexOf('_start') != -1) {
					result.push(value);
				}
			});
			return result;
		};
	});
	function config($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider,$logProvider){
		$compileProvider.debugInfoEnabled(true);
		$logProvider.debugEnabled(true);
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
	    .state('newsevents',{
	        url: '/newsevents',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/news.html',
					controller: 'listCtrl'
	            }
	        }
	    })
	    .state('projects',{
	        url: '/projects',
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
	                templateUrl: '/acdh/js/views/contact.html',
					controller: 'contactCtrl'
	            }
	        }
	    })
	    .state('start',{
	        url: '/',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/start.html',
					controller: 'listCtrl'
	            }
	        }
	    });
	}
}
)();