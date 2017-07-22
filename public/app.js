
 var app=angular.module("queryApp",[]);

  app.controller('queryController',['$scope', function($scope){
  $scope.query = ''; //this is not necessary, could leave blank and angular would auto create it.  For clarity im leaving it in
  }]);
//controller is a mini app
//scope connects html and javascript variables

