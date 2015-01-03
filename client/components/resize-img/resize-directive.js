'use strict';
angular.module('evtrsScrollApp')
.directive('bg', function ($window) {
    // Adopted from simpulton/angularjs-greensock-site
    var linker = function (scope, element, attrs) {
        var resizeBG = function () {
            var bgwidth = element.width();
            var bgheight = element.height();

            var winwidth = $window.innerWidth;
            var winheight = $window.innerHeight;

            var widthratio = winwidth / bgwidth;
            var heightratio = winheight / bgheight;

            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;

            if (heightdiff > winheight) {
                element.css({
                    width: winwidth + 'px',
                    height: heightdiff + 'px'
                });
            } else {
                element.css({
                    width: widthdiff + 'px',
                    height: winheight + 'px'
                });
            }
        }

        resizeBG();

        var windowElement = angular.element($window);
        windowElement.resize(resizeBG);
    }

    return {
        restrict: 'A',
        link: linker
    };
})