'use strict';

angular.module('evtrsScrollApp').directive('cdwsAccordion', function (Auth) {

    return {
        restrict: 'E',
        templateUrl: 'components/accordion/accordion.html',
        allowMultipleOpen: '@',
        contentTemplate: '@',
        scope: {
            viewModel: '='
        },
        link: function (scope, element, attrs) {
            //if false, collapse all other panels on toggleCollapse
            var multipleOpen = attrs.multipleOpen;

            scope.isLoggedIn = Auth.isLoggedIn();

            scope.modelLoaded = false;

            scope.$on('ACCORDION_LOADED', function() {
                scope.modelLoaded = true;
            });

            scope.contentTemplateUrl = attrs.contentTemplate;

            scope.toggleCollapse = function (index) {
                angular.forEach(scope.viewModel, function (value, key) {
                    if (key == index) {
                        scope.viewModel[key].collapsed = !scope.viewModel[key].collapsed;
                    }
                    else {
                        if (multipleOpen !== 'true') {
                            scope.viewModel[key].collapsed = true;
                        }
                    }
                });
            }
        }
    };
});
