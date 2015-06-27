'use strict';
angular.module('plantzrApp')
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $provide) {

        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/article/article-overview.html'
            })
            .state('create', {
                url: '/article/create',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl'
            })
            .state('detail', {
                url: '/article/:articleId',
                templateUrl: 'app/article/article-display.html',
                controller: 'ArticleDisplayCtrl',
                resolve: {
                    article: function (ArticleResource, $stateParams, $state) {
                        return loadArticle(ArticleResource, $stateParams.articleId, $state)
                    }
                }
            })
            .state('edit', {
                url: '/article/edit/:articleId',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl',
                resolve: {
                    article: function (ArticleResource, $stateParams, $state) {
                        return loadArticle(ArticleResource, $stateParams.articleId, $state)
                    }
                }
            });


        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$injector', function (taRegisterTool, taOptions, $injector) {

            taRegisterTool('insertImg', {
                iconclass: "fa fa-picture-o",
                action: function () {
                    var rootScope = $injector.get('$rootScope');
                    rootScope.$broadcast('INSERT_IMAGE');
                }
            });

            return taOptions;
        }]);


        var loadArticle = function (ArticleResource, articleId, $state) {
            return ArticleResource.getById(articleId).then(
                function (data) {
                    return data;

                }).catch(function (error) {
                    $log.error('Could not load article: ' + $stateParams.articleId + ' : ' + error.statusText);
                    //TODO throw error and use exception handler to redirect
                    $state.go('home');
                })
        }

    });





