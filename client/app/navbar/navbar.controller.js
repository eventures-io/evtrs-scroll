'use strict';

angular.module('plantzrApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth, toaster) {

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.$on('NETWORK_ERROR',  function(event, error){
            toaster.pop('error',  error.title  , '<ul><li>' + error.message + '</li></ul>', null, 'trustedHtml');

        })



    });