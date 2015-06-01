'use strict';
angular.module('evtrsScrollApp').
    factory('HttpRequestInterceptor', function ($rootScope, $q) {
        var pendingRequests = 0;

        return {
            request: function (config) {
                config.timeout = 20000;
                return config || $q.when(config)
            },
            responseError: function (response) {
                $rootScope.$broadcast('NETWORK_ERROR', {
                        title: response.status ? response.status : 'NETWORK ERROR',
                        message: response.statusText ? response.statusText : 'COULD NOT CONNECT'
                    }
                );
                return $q.reject(response);
            }
        };
    });