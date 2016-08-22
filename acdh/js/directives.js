(function () { // good to browse - https://toddmotto.com/minimal-angular-module-syntax-approach-using-an-iife/
  'use strict';
  var app = angular.module('acdh');
  app.directive('navbar', function(){
  // ng-if='show.navbar' should be set in sections...
  return {
	replace: true,
	restrict: 'E',
	transclude: true,
	templateUrl: '/acdh/js/views/navbar.html',
	controller: [ '$scope', 'navList', function($scope,navList){
	  var getListPromise;
	  if(typeof($scope.Model) == 'undefined'){$scope.Model = {};}
	  $scope.toggleNavLang = function(curlang){ console.log('curlang-NAVBAR:', curlang);
			getListPromise = navList.getListPromise(curlang);
			getListPromise.then(
			  function(res){console.log('res-NAVBAR:', res);
				for(var i=0; i<res.data.length; i++){
				  if( res.data[i].hasOwnProperty('schema:headline') ){
					res.data[i]['headline'] = res.data[i]['schema:headline'];
					res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&\s]+/g, '');
					res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
					res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
					res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
				  }
				  if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
					res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
					res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
				  }
				}
				$scope.Model['navbar'] = res.data;
			  },
				function(err){ console.log('err LISTCTRL: ', err); }
			  );
	  };
	  getListPromise = navList.getListPromise();
	  getListPromise.then(
		function(res){
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
			  res.data[i]['headline'] = res.data[i]['schema:headline'];
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&\s]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
		  }
		  $scope.Model['navbar'] = res.data;
		},
		function(err){ console.log('err navbar-LISTCTRL: ', err); }
	  );
	  }]
  }
  });
})();