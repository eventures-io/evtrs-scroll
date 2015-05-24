'use strict';

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, ArticleResource, $log, $stateParams, $state ) {

    $scope.article = {
        images : []
    };

    $scope.includeImg = false;
    $scope.spinner = {};
    $scope.submitted = false;
    $scope.saveAction = 'Save';
    var preview = angular.element(document.querySelector('.image-preview'));

    if ($stateParams.articleId) {
        $scope.title = 'Edit article';
        ArticleResource.getById($stateParams.articleId).then(
            function (data) {
                $scope.article = data;
                $scope.saveAction = 'Update';
            }).catch(function (error) {
                $log.error('Could not load article: ' + $stateParams.articleId + ' : ' + error.statusText);
                $state.go('home');
            });
    } else {
        $scope.title = 'Create article';
    }

    $scope.$on('INSERT_IMAGE', function () {
        if($scope.article.images.length < 3) {
            $scope.includeImg = true;
        }
    });

    $scope.$watch('imageFile', function () {
        if ($scope.imageFile && $scope.imageFile.length) {
            var file = $scope.imageFile[0];
            var reader = new FileReader();
            var imageCount = $scope.article.images.length;

            reader.onloadend = function () {
                $scope.article.images[imageCount] = reader.result;
                $scope.includeImg = false;
                $scope.$apply();
            }
            if (file) {
                reader.readAsDataURL(file);
            } else {
                $log.error('Could not read image file ');
            }
        }
    });

    $scope.findMatchingTypes = function (type) {
        $scope.spinner.show = true;
        return ArticleResource.findMatchingTypes(type).then(function (response) {
            $scope.spinner.show = false;
            return response;
        }, function (error) {
            $scope.spinner.show = false;
            $log.error('Error loading types for ' + type + ': ' + JSON.stringify(error));
        });
    };

    $scope.save = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            if ($scope.saveAction === 'Save') {
                $scope.article.publDate = new Date();
                var type = $scope.article.type;
                $scope.article.type = type.charAt(0).toUpperCase().concat(type.slice(1).toLowerCase());

                ArticleResource.save($scope.article)
                    .then(function (data) {
                        ArticleResource.invalidateCache();
                        $scope.article = data;
                        $scope.saveAction = 'Update';
                        $scope.submitted = false;
                    }
                );
            } else {
                $scope.article.modDate = new Date();
                $scope.article.put().then(function() {
                    $scope.submitted = false;
                });

            }
        }
    };

    $scope.delete = function () {
        $scope.article.remove().then(function () {
            $state.go('home');
        });
    }


});


angular.module('evtrsScrollApp')
    .controller('ArticleDisplayCtrl', function ($scope, $stateParams, ArticleResource, $state) {

        if ($stateParams.articleId) {
            ArticleResource.getById($stateParams.articleId).then(
                function (data) {
                    $scope.article = data;
                });
        }

        $scope.close = function () {
            $state.go('home');
        };

    });


angular.module('evtrsScrollApp').controller('AccordionController', function ($scope, ArticleResource, $state, $timeout) {

    $scope.$on('ACCORDION_LOADED', function() {
        //Hide loading spinner
        $scope.modelLoaded = true;
    });

    ArticleResource.getAll().then(function (response) {
        var recent = response.plain();
        var articles = [];

        _.forEach(recent, function (value, key) {
            var group = _.find(articles, {group: value.type});
            if (group) {
                group.content.push(
                    {
                        id: value._id,
                        title: value.title,
                        image: value.images[0]
                    }
                )
            }
            else {
                articles.push({
                        group: value.type,
                        content: [
                            {
                                id: value._id,
                                title: value.title,
                                image: value.images[0]
                            }
                        ],
                        collapsed: true
                    }
                );
            }
        });
        //articles[0].collapsed = false;
        $scope.articles = articles;

    });


    $scope.showDetailView = function(id){
        angular.forEach($scope.viewModel, function(article) {
            article.collapsed = true;
        });

        $timeout(function() {
            return $state.go('detail', {articleId : id});
        }, 1000);

    }


});