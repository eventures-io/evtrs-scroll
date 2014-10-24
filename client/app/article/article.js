'use strict';

angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article-create', {
                url: '/article-create',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl'
            });
    });

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, Article) {

    $scope.reset = function () {
        $scope.article = new Article();
        $scope.article.content = '';
        $scope.saveAction = 'Save';
    }

    $scope.reset();

    $scope.save = function () {
        if ($scope.saveAction === 'Save') {
            console.log('saving : ' + $scope.article.content);
            $scope.article.publDate = new Date();
            $scope.article.type = 'blogpost';
            $scope.article.$save()
                .then(function (data) {
                    console.log('successfully saved post: ' + data._id);
                    $scope.saveAction = 'Update';
                    $scope.article = angular.fromJson(data);
                });
        } else {
            $scope.article.modDate = new Date();
            $scope.article.$update()
            .then(function (data) {
                    console.log('successfully updated post: ' + data._id);
                    $scope.article = angular.fromJson(data);
            });
        }
    };

});