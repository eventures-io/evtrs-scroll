'use strict';

$(window).scroll(function () {
    if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
    } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
    }
});

angular.module('evtrsScrollApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'textAngular',
        'restangular'
    ])
    .config(function ($httpProvider, RestangularProvider) {

        $httpProvider.interceptors.push('authInterceptor');

        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRestangularFields({id: "_id"});

//        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
//            return function (exception, cause) {
//                var $rootScope = $injector.get("$rootScope");
//                $rootScope.addError({message: "Exception", reason: exception});
//                $delegate(exception, cause);
//            };
//        });

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

//    //generic exception handler
//    .factory("errors", function ($rootScope) {
//        return {
//            catch: function (message) {
//                return function (reason) {
//                    $rootScope.addError({message: message, reason: reason})
//                };
//            }
//        };
//    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    });