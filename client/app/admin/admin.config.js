'use strict';

angular.module('plantzrApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/account/register/register.html',
                controller: 'RegistrationCtrl'
            })
            .state('settings', {
                url: '/admin/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl',
                authenticate: true
            }).state('admin', {
                url: '/admin/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl',
                authenticate: true
            });
    });

