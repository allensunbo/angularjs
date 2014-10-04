var app = angular.module('jwtApp', []);

app.controller('MainCtrl', ['$scope', 'UserFactory', '$q', function($scope, UserFactory, $q) {
	$scope.message = 'hello, world!';
	var allUsers = [];
	for(var i=0;i<12;i++){
		allUsers.push(UserFactory.getUser());
	}
	$q.all(allUsers).then(function(results){
		$scope.users = [];
		for(var i=0;i<results.length;i++){
			$scope.users.push(results[i].data);
		}
	}); 
	
	
}]); 

app.factory('UserFactory', function($http){
  return {
	getUser: function(){
			return $http.get('http://localhost:3000/random-user');
		}
  };
});
