'use strict';

angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: 'admin/register',
                templateUrl: 'app/account/signup/register.html',
                controller: 'RegistrationCtrl',
                authenticate: true
            })
            .state('settings', {
                url: 'admin/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl',
                authenticate: true
            }).state('admin', {
                url: 'admin/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl'
            });
    });

