'use strict';

angular.module('evtrsScrollApp')
    .controller('MainCtrl', function ($scope, $state, ScrollService, ArticleResource, parallaxHelper) {
        $scope.$on('$viewContentLoaded',
            function () {
                ScrollService.scrollToAnchor($state.current.data.elementId);
            });


        $scope.background = parallaxHelper.createAnimator(-0.3);

        $scope.recentPosts = [];

        var getRecentPosts = function () {
            ArticleResource.getRecent().then(function (data) {
                $scope.recentPosts = data;
            });
        };
        getRecentPosts();
    });


