var app = angular.module('jwtApp', []);

app.controller('MainCtrl', ['$scope', 'UserFactory', function($scope, UserFactory) {
	$scope.message = 'hello, world!';
	UserFactory.getUser()
	.success(function(data){
		$scope.user = data;
	});
}]); 

app.factory('UserFactory', function($http){
  return {
	getUser: function(){
			return $http.get('http://localhost:3000/random-user');
		}
  };
});
