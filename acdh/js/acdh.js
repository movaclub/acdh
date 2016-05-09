// acdh (C) 2016
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
	        url: '^/project',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/project.html',
					controller: 'listCtrl'/*,
					resolve:{
					  'myList':function(getLists){return getLists.promise;}
					}*/
	            }
	        }
	    })
	    .state('knowmore',{
	        url: '^/knowmore',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/knowmore.html',
					controller: 'listCtrl'/*,
					resolve:{
					  'myList':function(getLists){return getLists.promise;}
					}*/
	            }
	        }
	    })
	    .state('partners',{
	        url: '/partners',
	        views: {
	            'content@': {
	                templateUrl: '/acdh/js/views/partners.html',
					controller: 'listCtrl'/*,
					resolve:{
					  'myList':function(getLists){return getLists.promise;}
					}*/
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