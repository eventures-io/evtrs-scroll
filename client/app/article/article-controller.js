'use strict';

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, ArticleResource, $log) {

    $scope.article = {};
    $scope.saveAction = 'Save';
    $scope.submitted = false;
    $scope.includeImg = false;
    $scope.image = {};
    $scope.spinner= {};

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

    $scope.findMatchingTypes = function (type) {
        $scope.spinner.show = true;
        return ArticleResource.findMatchingTypes(type).then(function (response) {
            $scope.spinner.show = false;
            return response;
        }, function(error) {
            $scope.spinner.show = false;
            $log.error('Error loading types for ' + type + ': ' + JSON.stringify(error));
        });
    };

    $scope.save = function (form) {
        if (form.$valid) {
            if ($scope.saveAction === 'Save') {
                $scope.article.publDate = new Date();
                var type = $scope.article.type;
                $scope.article.type = type.charAt(0).toUpperCase().concat(type.slice(1).toLowerCase());

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

        if ($stateParams.articleId) {
            lArticleResource.getById($stateParams.articleId).then(
                function (data) {
                    $scope.article = data;
                });
        }

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
                        id: value._id,
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
                                id: value._id,
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