'use strict';

angular.module('evtrsScrollApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'textAngular',
        'restangular',
        'ngFileUpload',
        'angular-loading-bar',
        'toaster'

    ])
    .config(function ($httpProvider, RestangularProvider, cfpLoadingBarProvider) {

        //TODO: filter out 404's & 401's
        //$httpProvider.interceptors.push('HttpRequestInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRestangularFields({id: '_id'});
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
        cfpLoadingBarProvider.includeSpinner = false;
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth, Restangular, $cacheFactory) {

        Restangular.setResponseInterceptor(function(response, operation) {
            if (operation === 'put' || operation === 'post' || operation === 'delete') {
                $cacheFactory('http').removeAll();
            }
            return response;
        });

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });

    });

