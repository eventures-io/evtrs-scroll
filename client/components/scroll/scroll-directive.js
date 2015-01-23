'use strict'
angular.module('evtrsScrollApp').directive('smoothScroll', function($location) {
    'use strict';

    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {

            initialize();

            //see also
           // https://github.com/scottcorgan/angular-scrollto

            function initialize() {

                $element.on('click', function() {
                    scrollTo($attrs.target);
                });
            }

            function scrollTo(target) {

                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }

            }

        }
    };
});