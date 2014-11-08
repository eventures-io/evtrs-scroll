'use strict';

angular.module('evtrsScrollApp').factory('ScrollService',function ($document) {


    var scrollToAnchor = function (id) {
        var el = angular.element(document.getElementById(id));
        $document.scrollToElementAnimated(el);
    };

    return {
        scrollToAnchor : scrollToAnchor
    };

});