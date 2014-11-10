'use strict'

angular.module('evtrsScrollApp').filter('renderHtml', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

