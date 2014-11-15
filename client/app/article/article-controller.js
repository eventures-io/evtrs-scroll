'use strict';

angular.module('evtrsScrollApp').config(function ($stateProvider) {
    $stateProvider
        .state('article-create', {
            url: '/admin/article-create',
            templateUrl: 'app/article/article-create.html',
            controller: 'ArticleCtrl'
        });
});

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, ArticleResource) {

    $scope.initialize = function () {
        $scope.article = {};
        $scope.saveAction = 'Save';
        $scope.submitted = false;
    };

    $scope.initialize();

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

});

angular.module('evtrsScrollApp')
    .controller('ArticleDisplayCtrl', function ($scope, $stateParams, ArticleResource) {

        var loadArticle = function () {
            ArticleResource.getById($stateParams.articleId).then(
                function (data) {
                    $scope.article = data;
                });
        };
        if ($stateParams.articleId) {
            loadArticle();
        }

});