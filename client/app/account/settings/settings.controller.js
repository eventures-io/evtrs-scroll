'use strict';

angular.module('plantzrApp')
    .controller('SettingsCtrl', function ($scope, User, Auth) {
        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                //demo: don't allow change password
                Auth.changePassword($scope.user.oldPassword, $scope.user.oldPassword)
                    .then(function () {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
            }
        };
    });
