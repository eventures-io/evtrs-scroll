'use strict';

angular.module('evtrsScrollApp')
    .directive('parallax', ['$window',
        function ($window) {
            return {
                restrict: 'A',
                transclude: true,
                template: '<div ng-transclude></div>',
                scope: {
                    parallaxRatio: '@',
                    parallaxOffset: '@',
                },
                link: function ($scope, elem, attrs) {
                    var setPosition = function () {
                        var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1) - ($scope.parallaxOffset ? $scope.parallaxOffset : 0) * $window.innerHeight;
                        elem.css('background-position', "0% " + calcValY + "px");
                    };

                    angular.element($window).bind('load', function (e) {
                        setPosition();
                        $scope.$apply();
                    });

                    angular.element($window).bind("scroll", setPosition);
                }
            };
        }
    ]);