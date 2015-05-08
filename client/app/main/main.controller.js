'use strict';

angular.module('evtrsScrollApp')
    .controller('MainCtrl', function ($scope, $state, ArticleResource) {

        $scope.recentPosts = [];

        $scope.getRecentPosts = function () {
            ArticleResource.getRecent().then(function (data) {
                $scope.recentPosts = data;
            });
        };

    });


