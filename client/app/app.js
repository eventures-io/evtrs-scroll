'use strict';

angular.module('evtrsScrollApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'textAngular',
        'restangular',
        'duScroll'
    ])
    .value('duScrollDuration', 1200)
    .config(function ($httpProvider, RestangularProvider) {

        $httpProvider.interceptors.push('authInterceptor');

        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRestangularFields({id: '_id'});

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

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });

        $rootScope.$on('duScrollspy:becameActive', function ($event, $element) {
            //Automaticly update location
                $location.path($element.prop('pathname'));
                $rootScope.$apply();

        })

    });