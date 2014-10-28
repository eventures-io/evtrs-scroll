'use strict';

angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article-create', {
                url: '/article-create',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleSaveCtrl'
            });
    });

angular.module('evtrsScrollApp').controller('ArticleSaveCtrl', function ($scope, Articles) {

    $scope.saveAction = 'save';
    $scope.disabled = true;
    $scope.submitted = false;

    $scope.$watch('article.content', function (newVal) {
        if (newVal !== '') {
            $scope.disabled = false;
        }
    });

    $scope.reset = function () {
        $scope.article = {};
        $scope.article.content = '';
        $scope.saveAction = 'Save';
    };
    $scope.reset();

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

});