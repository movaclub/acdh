(function () {
  'use strict';
  var app = angular.module('acdh');
  app.controller('startCtrl',['$scope','$http', '$state', 'startList', '$window', function($scope, $http, $state, startList, $window){ // no lang switcher
	$scope.Model = {};
	$scope.uiview = {};
	$scope.uiview.list = true;
	$scope.uiview.grid = false;
	var getListPromise = startList.getListPromise();
	getListPromise.then(
		function(res){
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		},
		function(err){ console.log('err LISTCTRL: ', err); }
	  );

	$scope.onList = function(){
	  $scope.uiview.list = true;
	  $scope.uiview.grid = false;
	};
	$scope.onGrid = function(){
	  $scope.uiview.list = false;
	  $scope.uiview.grid = true;
	};
  }]);
  app.controller('newsCtrl',['$scope','$http', '$state', 'newsList', function($scope, $http, $state, newsList){
	
	$scope.Model = {};
	$scope.uiview = {};
	$scope.uiview.list = true;
	$scope.uiview.grid = false;

	$scope.onList = function(){
	  $scope.uiview.list = true;
	  $scope.uiview.grid = false;
	};
	$scope.onGrid = function(){
	  $scope.uiview.list = false;
	  $scope.uiview.grid = true;
	};

	var getListPromise;

	$scope.toggleLang = function(curlang){
		  getListPromise = newsList.getListPromise(curlang);
		  getListPromise.then(
			  function(res){ var tags = [];
				for(var i=0; i<res.data.length; i++){
				  if( res.data[i].hasOwnProperty('schema:headline') ){
	  			  res.data[i]['headline'] = res.data[i]['schema:headline'];
					res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
					res.data[i]['schema:description'] = res.data[i]['schema:description'];
					res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
				  }
				  if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
					res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
					res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
				  }
				  if( res.data[i].hasOwnProperty('schema:keywords') ){
					tags = res.data[i]['schema:keywords'];
					res.data[i]['schema:tags'] = [];
					res.data[i]['schema:keywords'] = [];
					for(var k=0; k<tags.length; k++){
					  res.data[i]['schema:tags'].push(tags[k]['name']);
					}
				  }
				}
				$scope.Model[$state.current.name] = res.data;
				$state.go('newsevents');
			  },
			  function(err){ console.log('err LISTCTRL: ', err); }
			);
	};
	getListPromise = newsList.getListPromise();
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
			  res.data[i]['headline'] = res.data[i]['schema:headline'];
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		  $state.go('newsevents');
		},
		function(err){ console.log('err LISTCTRL: ', err); }
	  );
  }]);
  app.controller('partnerCtrl',['$scope','$http', '$state', 'partnerList', function($scope, $http, $state, partnerList){
	$scope.Model = {};
	$scope.uiview = {};
	$scope.uiview.list = true;
	$scope.uiview.grid = false;

	$scope.onList = function(){
	  $scope.uiview.list = true;
	  $scope.uiview.grid = false;
	};
	$scope.onGrid = function(){
	  $scope.uiview.list = false;
	  $scope.uiview.grid = true;
	};	
	var getListPromise;
	$scope.toggleLang = function(curlang){
		  getListPromise = partnerList.getListPromise(curlang);
		  getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data; //console.log('$scope.Model[$state.current.name] - ', $scope.Model[$state.current.name]);
		},
			  function(err){ console.log('err LISTCTRL: ', err); }
			);
	};

	getListPromise = partnerList.getListPromise();
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		},
		function(err){ console.log('err LISTCTRL: ', err); }
	  );
  }]);
  app.controller('knowmoreCtrl',['$scope','$http', '$state', 'knowmoreList', function($scope, $http, $state, knowmoreList){
	$scope.Model = {};
	$scope.uiview = {};
	$scope.uiview.list = true;
	$scope.uiview.grid = false;

	$scope.onList = function(){
	  $scope.uiview.list = true;
	  $scope.uiview.grid = false;
	};
	$scope.onGrid = function(){
	  $scope.uiview.list = false;
	  $scope.uiview.grid = true;
	};
	var getListPromise;
	$scope.toggleLang = function(curlang){
		  getListPromise = knowmoreList.getListPromise(curlang);
		  getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
// 			  res.data[i]['headline'] = res.data[i]['schema:headline'];
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		},
			  function(err){ console.log('err LISTCTRL: ', err); }
			);
	};
	getListPromise = knowmoreList.getListPromise();
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
// 			  res.data[i]['headline'] = res.data[i]['schema:headline'];
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		},
		function(err){ console.log('err LISTCTRL: ', err); }
	  );
  }]);
  app.controller('projectCtrl',['$scope','$http', '$state', 'projectList', function($scope, $http, $state, projectList){
	$scope.Model = {};
	$scope.uiview = {};
	$scope.uiview.list = true;
	$scope.uiview.grid = false;

	$scope.onList = function(){
	  $scope.uiview.list = true;
	  $scope.uiview.grid = false;
	};
	$scope.onGrid = function(){
	  $scope.uiview.list = false;
	  $scope.uiview.grid = true;
	};
	var getListPromise;
	$scope.toggleLang = function(curlang){
		  getListPromise = projectList.getListPromise(curlang);
		  getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
// 			  res.data[i]['headline'] = res.data[i]['schema:headline'];
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		},
			  function(err){ console.log('err LISTCTRL: ', err); }
			);
	};
	getListPromise = projectList.getListPromise();
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:headline') ){
// 			  res.data[i]['headline'] = res.data[i]['schema:headline'];
			  res.data[i]['schema:headline'] = res.data[i]['schema:headline'].replace(/[&]+/g, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'];
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].replace(/<[^<>]+>/gm, '');
			  res.data[i]['schema:description'] = res.data[i]['schema:description'].substring(0,55);
			  res.data[i]['schema:description'] = res.data[i]['schema:description'] + '...';
			}
			if( res.data[i].hasOwnProperty('schema:primaryImageOfPage') ){
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace(/^[^:]+:/, '');
			  res.data[i]['schema:primaryImageOfPage'] = res.data[i]['schema:primaryImageOfPage'].replace('-', '_');
			}
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		},
		function(err){ console.log('err LISTCTRL: ', err); }
	  );
  }]);
  app.controller('contactCtrl',['$scope','$http', '$state', 'contactPage', function($scope, $http, $state, contactPage){
	$scope.Model = {};
	
	var getListPromise;
	
	$scope.toggleLang = function(curlang){
		  getListPromise = contactPage.getListPromise(curlang);
		  getListPromise.then(
			function(res){ var tags = [];
			  for(var i=0; i<res.data.length; i++){
				if( res.data[i].hasOwnProperty('schema:keywords') ){
				  tags = res.data[i]['schema:keywords'];
				  res.data[i]['schema:tags'] = [];
				  res.data[i]['schema:keywords'] = [];
				  for(var k=0; k<tags.length; k++){
					res.data[i]['schema:tags'].push(tags[k]['name']);
				  }
				}
			  }
			  $scope.Model[$state.current.name] = res.data;
			},
			  function(err){ console.log('err LISTCTRL: ', err); }
			);
	};
	getListPromise = contactPage.getListPromise();
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.Model[$state.current.name] = res.data;
		},
		function(err){ console.log('err contactCtrl: ', err); }
	  );
  }]);
  app.controller('singleEvCtrl',['$scope','$http', '$stateParams', 'singleEvent', function($scope, $http, $stateParams, singleEvent){
	$scope.mySingle = {};
	var getListPromise;
	$scope.toggleLang = function(curlang){
		  getListPromise = singleEvent.getListPromise(curlang,$stateParams.nID);
		  getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		 function(err){ console.log('err LISTCTRL: ', err); }
		);
	};

	getListPromise = singleEvent.getListPromise(null,$stateParams.nID);
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  res.data[i]['schema:keywords'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singleEvent: ', err); }
	  );
  }]);
  
  app.controller('singlePaCtrl',['$scope','$http', '$stateParams', 'singlePartner', function($scope, $http, $stateParams, singlePartner){
	$scope.mySingle = {};
	var getListPromise;
	$scope.toggleLang = function(curlang){
		  getListPromise = singlePartner.getListPromise(curlang,$stateParams.nID);
		  getListPromise.then(
		function(res){
		  $scope.mySingle = res.data;
		},
		 function(err){ console.log('err singlePaCtrl: ', err); }
		);
	};

	getListPromise = singlePartner.getListPromise(null,$stateParams.nID);
	getListPromise.then(
		function(res){
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singlePaCtrl: ', err); }
	  );
  }]);
  app.controller('singleKnCtrl',['$scope','$http', '$stateParams', 'singleKnow', function($scope, $http, $stateParams, singleKnow){
	$scope.mySingle = {};
	var getListPromise;
	$scope.toggleLang = function(curlang){
		  getListPromise = singleKnow.getListPromise(curlang,$stateParams.nID);
		  getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		 function(err){ console.log('err singleKnow: ', err); }
		);
	};

	getListPromise = singleKnow.getListPromise(null,$stateParams.nID);
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singleKnow: ', err); }
	  );
  }]);
  app.controller('singleProCtrl',['$scope','$http', '$stateParams', 'singleProject', function($scope, $http, $stateParams, singleProject){
	$scope.mySingle = {};
	var getListPromise;
	$scope.toggleLang = function(curlang){
		  getListPromise = singleProject.getListPromise(curlang,$stateParams.nID);
		  getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		 function(err){ console.log('err singleProCtrl: ', err); }
		);
	};

	getListPromise = singleProject.getListPromise(null,$stateParams.nID);
	getListPromise.then(
		function(res){ var tags = [];
		  for(var i=0; i<res.data.length; i++){
			if( res.data[i].hasOwnProperty('schema:keywords') ){
			  tags = res.data[i]['schema:keywords'];
			  res.data[i]['schema:tags'] = [];
			  for(var k=0; k<tags.length; k++){
				res.data[i]['schema:tags'].push(tags[k]['name']);
			  }
			}
		  }
		  $scope.mySingle = res.data;
		},
		function(err){ console.log('err singleProject: ', err); }
	  );
  }]);
})();