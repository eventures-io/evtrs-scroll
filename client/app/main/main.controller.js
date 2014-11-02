'use strict';

angular.module('evtrsScrollApp')
    .controller('MainController', function ($scope, $state, ScrollService) {

    $scope.$on('$viewContentLoaded',
        function () {
            ScrollService.scrollToAnchor($state.current.data.elementId);
        });

});