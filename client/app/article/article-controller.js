'use strict';

angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article-display', {
                url: '/article/:articleId',
                templateUrl: 'app/article/article-display.html',
                controller: 'ArticleCtrl'
            });
    });

angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article-create', {
                url: '/article-create',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl'
            });
    });

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, Articles, $stateParams, $sce) {

    $scope.saveAction = 'save';
    $scope.disabled = true;
    $scope.submitted = false;
    $scope.saveAction = 'Save';


    var loadArticle = function(){
        Articles.getById($stateParams.articleId).then(
            function(data){
                $scope.article = data;
            });
    };
    if($stateParams.articleId) {
        loadArticle();
    }

    $scope.save = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            if ($scope.saveAction === 'Save') {
                $scope.article.publDate = new Date();
                Articles.save($scope.article)
                    .then(function (data) {
                        $scope.article = data;
                        $scope.saveAction = 'Update';

                    }
                );
            } else {
                $scope.article.modDate = new Date();
                $scope.article.put();
            }
        }
    };

    $scope.renderContent = function() {
        return $sce.trustAsHtml($scope.article.content);
    };

});