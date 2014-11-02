'use strict';

angular.module('evtrsScrollApp').service('ScrollService', ['$window', function () {

    var duration = 1200;
    var easing = 'easeInOutExpo';

    this.scrollToAnchor = function (elId) {
        $('html, body').animate({
            scrollTop: $('#'.concat(elId)).offset().top
        }, duration, easing );
    };

    this.setDuration = function(duration) {
        if(_.isNumber(duration)){
            this.duration = duration;
        }
    };

    this.setEasing = function(easing) {
        this.easing = easing;
    };

}]);