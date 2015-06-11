'use strict';
angular.module('evtrsScrollApp').
    factory('HttpRequestInterceptor', function ($rootScope, $q) {

        return {
            request: function (config) {
                config.timeout = 20000;
                return config || $q.when(config)
            },
            responseError: function (response) {

                if (response.status !== 401 && response.status !== 404 && response.status !== 403) {
                    $rootScope.$broadcast('NETWORK_ERROR', {
                            title: response.status ? response.status : 'NETWORK ERROR',
                            message: response.statusText ? response.statusText : 'COULD NOT CONNECT'
                        }
                    );
                }
                return $q.reject(response);
            }
        };
    });