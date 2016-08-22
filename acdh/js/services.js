(function () {
  'use strict';
  var app = angular.module('acdh');

  /* API URL templates "&callback=JSON_CALLBACK" is required??? */
  //  One Partner Link (full info) https://dhdev.eos.arz.oeaw.ac.at/en/api_0_1/taxterm?parameters[tid]=236
  var listURL = {
			   'start':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?parameters[field_tags]=209',
			  'navbar':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=dha_page&parameters[tags]=214',
		  'newsevents':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=event',
			'partners':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/taxterm?parameters[vid]=5&parameters[tags]=207&pagesize=all',
			'knowmore':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=biblio',
			'projects':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?pagesize=all&parameters[type]=project',
			 'contact':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?parameters[nid]=165',
 
		  'single':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/nodes?&parameters[nid]=',
		 'singlep':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/taxterm?&parameters[tid]=',
		   'termsflat':'https://dhdev.eos.arz.oeaw.ac.at/__LANG__/api_0_1/get_termstree?vid=4&flat=1'
  };

  /* Services */
  app.factory('curLang',['$window', function($window){
	var browserLang = $window.navigator.language || $window.navigator.userLanguage || $window.navigator.browserLanguage; // have no clue which is correct 
	var lang = 'en';
	if(browserLang == 'de-DE'){ lang = 'de'; }
	return { lang:lang }
  }]);
  app.service('navList', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang){
		var language = cur_lang || lang;
		var promise = $http.get(listURL['navbar'].replace('__LANG__', language));
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('startList', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(){
		var promise = $http.get(listURL['start'].replace('__LANG__', lang));
		deferObject =  deferObject || $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('newsList', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang){
		var language = cur_lang || lang;
		var promise = $http.get(listURL['newsevents'].replace('__LANG__', language));
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('partnerList', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang){
		var language = cur_lang || lang;
		var promise = $http.get(listURL['partners'].replace('__LANG__', language));
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('knowmoreList', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang){
		var language = cur_lang || lang;
		var promise = $http.get(listURL['knowmore'].replace('__LANG__', language));
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('projectList', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang){//console.log('STATE: ', 'projects');
		var language = cur_lang || lang;
		var promise = $http.get(listURL['projects'].replace('__LANG__', language));
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('contactPage', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang){console.log('STATE: ', 'contact');
		var language = cur_lang || lang;
		var promise = $http.get(listURL['contact'].replace('__LANG__', language));
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('contactPage', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang){console.log('STATE: ', 'contact');
		var language = cur_lang || lang;
		var promise = $http.get(listURL['contact'].replace('__LANG__', language));
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('singleEvent', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang,nid){console.log('STATE: ', 'singleEV');
		var language = cur_lang || lang;
		var url = listURL['single'].replace('__LANG__', language);
		var promise = $http.get(url + nid);
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('singlePartner', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang,nid){console.log('STATE: ', 'singleP');
		var language = cur_lang || lang;
		var url = listURL['singlep'].replace('__LANG__', language);
		var promise = $http.get(url + nid);
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('singleKnow', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang,nid){console.log('STATE: ', 'singleKN');
		var language = cur_lang || lang;
		var url = listURL['single'].replace('__LANG__', language);
		var promise = $http.get(url + nid);
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  app.service('singleProject', ['$http', '$q', 'curLang', function($http, $q, curLang){
	var lang = curLang.lang;
	var deferObject,
	getList = {
	  getListPromise: function(cur_lang,nid){console.log('STATE: ', 'singleKN');
		var language = cur_lang || lang;
		var url = listURL['single'].replace('__LANG__', language);
		var promise = $http.get(url + nid);
		deferObject =  $q.defer();
		promise.then( function(resp){ deferObject.resolve(resp); }, function(errr){ deferObject.reject(errr); } );
		return deferObject.promise;
	  }
	};
	return getList;
  }]);
  
//   app.service('getTerms', ['$http', '$q', function($http, $q){
// 	var deferObject,
// 	getTerms = {
// 	  getMenuPromise: function(url){
// 		var promise = $http.get(url);
// 		//deferObject =  deferObject || $q.defer();
// 		deferObject =  $q.defer();
// 		promise.then(
// 		  function(resp){ deferObject.resolve(resp); /*console.log('resp getMenu: ', resp);*/ },
// 		  function(errr){ deferObject.reject(errr); console.log('errr getMenu: ', errr); }
// 		);
// 		return deferObject.promise;
// 	  }
// 	};
// 	return getTerms;
//   }]);

})();