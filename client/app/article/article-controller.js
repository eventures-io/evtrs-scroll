'use strict';

angular.module('evtrsScrollApp').config(function ($stateProvider) {
    $stateProvider
        .state('article-display', {
            url: '/article/:articleId',
            templateUrl: 'app/article/article-display.html',
            controller: 'ArticleCtrl'
        }).state('article-create', {
            url: '/admin/article-create',
            templateUrl: 'app/article/article-create.html',
            controller: 'ArticleCtrl'
        });
});

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, ArticleResource, $stateParams, $sce) {

    $scope.menuStyle ='{visiblity: visible}';
    $scope.saveAction = 'Save';
    $scope.disabled = true;
    $scope.submitted = false;

    var loadArticle = function () {
        ArticleResource.getById($stateParams.articleId).then(
            function (data) {
                $scope.article = data;
            });
    };
    if ($stateParams.articleId) {
        loadArticle();
    }

    $scope.save = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            if ($scope.saveAction === 'Save') {
                $scope.article.publDate = new Date();
                ArticleResource.save($scope.article)
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

    $scope.renderContent = function () {
        return $sce.trustAsHtml($scope.article.content);
    };

});