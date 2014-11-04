'use strict';

angular.module('evtrsScrollApp')
    .controller('MainCtrl', function ($scope, $state, ScrollService, ArticleResource) {

    $scope.$on('$viewContentLoaded',
        function () {
            ScrollService.scrollToAnchor($state.current.data.elementId);
        });
        $scope.recentPosts = [];

        var getRecentPosts = function(){
            ArticleResource.getRecent().then(function(data){
                $scope.recentPosts=data;
            });
        };
        getRecentPosts();
    });

angular.module('evtrsScrollApp').
    controller('ServicesCtrl', function ($scope, $controller, $state, ScrollService) {
    angular.extend(this, $controller('MainCtrl', {$scope: $scope, $state: $state, ScrollService: ScrollService}));

});