'use strict';

angular.module('plantzrApp').filter('HtmlFilter', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);