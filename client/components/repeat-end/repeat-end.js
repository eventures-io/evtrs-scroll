'use strict'
angular.module('evtrsScrollApp').directive("repeatEnd", function($timeout){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    scope.$emit('ACCORDION_LOADED');
                }, 500);
            }
        }
    };
});