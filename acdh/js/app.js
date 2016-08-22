(function () {
  'use strict';
  /* App Module */
  var app = angular.module('acdh', ['ngAria','ngRoute', 'ui.router','ngAnimate','ngSanitize','ngMaterial', 'ngStorage']);
  app.config(config);
  function config($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider, $logProvider, $mdThemingProvider){
	  $compileProvider.debugInfoEnabled(true);
	  $logProvider.debugEnabled(true);
	  $urlRouterProvider.otherwise('/');
	  $stateProvider
	  .state('start',{
		  url: '/',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/start.html',
				  controller: 'startCtrl'
			  }
		  }
	  })
	  .state('newsevents',{
		  url: '/newsevents',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/news.html', // https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/nodes?parameters[type]=schema:event
				  controller: 'newsCtrl'
			  }
		  }
	  })
	  .state('partners',{
		  url: '/partners',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/partners.html',
				  controller: 'partnerCtrl'
			  }
		  }
	  })
	  .state('projects',{
		  url: '/projects',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/project.html',
				  controller: 'projectCtrl'
			  }
		  }
	  })
	  .state('knowmore',{
		  url: '/knowmore',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/knowmore.html',
				  controller: 'knowmoreCtrl'
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
	  .state('s-news',{ // partyDetail({ partyID: id, partyLocation: location })
		  url: '/s-news/:nID',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/s-news.html',
				  controller: 'singleEvCtrl'
			  }
		  }
	  })
	  .state('s-partners',{
		  url: '/s-partners/:nID',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/s-partners.html',
				  controller: 'singlePaCtrl'
			  }
		  }
	  })
	  .state('s-knowmore',{
		  url: '/s-knowmore/:nID',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/s-knowmore.html',
				  controller: 'singleKnCtrl'
			  }
		  }
	  })
	  .state('s-project',{
		  url: '/s-project/:nID',
		  views: {
			  'content@': {
				  templateUrl: '/acdh/js/views/s-project.html',
				  controller: 'singleProCtrl'
			  }
		  }
	  });
	  $mdThemingProvider.theme('default')
	  .primaryPalette('orange')
	  .accentPalette('deep-orange');
  }
})();