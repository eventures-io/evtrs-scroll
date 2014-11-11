'use strict';

angular.module('evtrsScrollApp').filter('HtmlFilter', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);