'use strict'
angular.module('plantzrApp').directive("repeatEnd", function($timeout){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    scope.$emit('ACCORDION_LOADED');
                });
            }
        }
    };
});