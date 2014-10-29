'use strict';

//angular.module('evtrsScrollApp')
//    .filter('renderHtml', ['$sce', function($sce){
//        return function(text) {
//            return $sce.trustAsHtml(text);
//        };
//    }]);

angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article-display', {
                url: '/article/:articleId',
                templateUrl: 'app/article/article-display.html',
                controller: 'ArticleDisplayCtrl'
            });
    });

angular.module('evtrsScrollApp').controller('ArticleDisplayCtrl', function ($scope, $stateParams, Articles, $sce) {

     var loadArticle = function(){
         Articles.getById($stateParams.articleId).then(
             function(data){
             $scope.article = data;
         });
     };
     loadArticle();

     $scope.renderContent = function() {
         return $sce.trustAsHtml($scope.article.content);
    };

});

