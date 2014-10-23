'use strict';

angular.module('evtrsScrollApp')
    .factory('Article', function ($resource) {
        return $resource('/api/articles/:id', {
            id: '@_id'
        }, { //parameters default
            update: {
                method: 'PUT'
            }
        });
    });
