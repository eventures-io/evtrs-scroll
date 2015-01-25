'use strict';

angular.module('evtrsScrollApp').directive('accordion', function () {

    return {
        restrict: 'E',
        templateUrl: 'components/accordion/accordion.html',
        allowMultipleOpen: '@',
        scope: {
            model: '='
        },
        link: function (scope, element, attrs) {
            //if false, collapse all other panels on toggleCollapse
            var multipleOpen = attrs.multipleOpen;

            scope.toggleCollapse = function (index) {
                angular.forEach(scope.model, function (value, key) {
                    if (key == index) {
                        scope.model[key].collapsed = !scope.model[key].collapsed;
                    }
                    else {
                        if (multipleOpen !== 'true') {
                            scope.model[key].collapsed = true;
                        }
                    }
                });
            }
        }
    };
});
