'use strict';

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, ArticleResource) {

    $scope.article = {};
    $scope.saveAction = 'Save';
    $scope.submitted = false;
    $scope.includeImg = false;
    $scope.image = {};

    $scope.$on('INSERT_IMAGE', function () {
        $scope.includeImg = true;
    });

    $scope.$watch('imageFile', function () {
        if ($scope.imageFile && $scope.imageFile.length) {
            var preview = angular.element(document.querySelector('.image-preview'));
            var file = $scope.imageFile[0];
            var reader = new FileReader();

            reader.onloadend = function () {
                $scope.article.image = reader.result;
                preview[0].src = reader.result;
                $scope.includeImg = false;
                $scope.$apply();
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {
                $scope.article.image = undefined;
            }
        }
    });

    $scope.save = function (form) {

        if (form.$valid) {
            if ($scope.saveAction === 'Save') {
                $scope.article.publDate = new Date();
                ArticleResource.save($scope.article)
                    .then(function (data) {
                        $scope.article = data;
                        $scope.saveAction = 'Update';
                        $scope.submitted = true;
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
    .controller('ArticleDisplayCtrl', function ($scope, $stateParams, ArticleResource, $state) {

        $scope.animate = 'transition-in transition-out';

        var loadArticle = function () {
            ArticleResource.getById($stateParams.articleId).then(
                function (data) {
                    $scope.article = data;
                });
        };

        if ($stateParams.articleId) {
            loadArticle();
        }
        ;

        $scope.close = function () {
            $state.go('home');
        };

    });


angular.module('evtrsScrollApp').controller('AccordionController', function ($scope, ArticleResource) {

    ArticleResource.getRecent().then(function (response) {
        var recent = response.plain();
        $scope.articles = [];
        _.forEach(recent, function (value, key) {
            var group = _.find($scope.articles, {group: value.type});
            if (group) {
                group.content.push(
                    {
                        title: value.title,
                        image: value.image
                    }
                )
            }
            else {
                $scope.articles.push({
                        group: value.type,
                        content: [
                            {
                                title: value.title,
                                image: value.image
                            }
                        ],
                        collapsed: true
                    }
                );
            }

        });
    });

});