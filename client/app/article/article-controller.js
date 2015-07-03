'use strict';

angular.module('plantzrApp').controller('ArticleCtrl', function ($scope, ArticleResource, $log, $stateParams, $state, ImageService) {

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
        $scope.article = {
            images: []
        };
    }

    $scope.$on('INSERT_IMAGE', function () {
        if ($scope.article.images.length < 3) {
            $scope.includeImg = true;
        }
    });

    $scope.$watch('imageFile', function () {
        if ($scope.imageFile && $scope.imageFile.length) {
            var file = $scope.imageFile[0];
            var imageCount = $scope.article.images.length;

            loadImage.parseMetaData(
                file,
                function (data) {
                    var orientation = undefined;
                    if (data.exif){
                        orientation = data.exif.get('Orientation');
                    }
                    loadImage(
                        file,
                        function (canvas) {
                            if (canvas.type === "error") {
                                $log.error("Error loading image " + file);
                            } else {
                                var imgData = canvas.toDataURL('image/jpeg', 1.0)
                                createThumbnail(imgData, $scope.article);
                                $scope.article.images[imageCount] = imgData;
                                $scope.includeImg = false;
                                $scope.$apply();
                            }
                        },
                        {
                            canvas: true,
                            orientation: orientation
                        }
                    );

                }
            );

        }
    });


    var createThumbnail = function (imgSrc, article) {
        ImageService.resize(imgSrc, 0.3)
            .then(function (resizedImage) {
                article.thumbnail = resizedImage.src;
            },function(error){
                $log.error('could not create thumbnail', error);
            });
    }

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
            var type = $scope.article.type;
            $scope.article.type = type.charAt(0).toUpperCase().concat(type.slice(1).toLowerCase());

            if ($scope.saveAction === 'Save') {
                $scope.article.publDate = new Date();
                ArticleResource.save($scope.article)
                    .then(function (data) {
                        $scope.article = data;
                        $scope.saveAction = 'Update';
                        $scope.submitted = false;
                    }
                );
            } else {
                $scope.article.modDate = new Date();
                $scope.article.put().then(function (updated) {
                    scope.article = updated;
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


    $scope.close = function () {
        $state.go('home');
    };


});


angular.module('plantzrApp')
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


angular.module('plantzrApp').controller('AccordionController', function ($scope, ArticleResource, $state, $timeout) {

    $scope.$on('ACCORDION_LOADED', function () {
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
                        thumbnail: value.thumbnail
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
                                thumbnail: value.thumbnail
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


    $scope.showDetailView = function (id, view) {
        angular.forEach($scope.viewModel, function (article) {
            article.collapsed = true;
        });

        $timeout(function () {
            return $state.go(view, {articleId: id});
        }, 1000);

    }


});