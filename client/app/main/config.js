'use strict';
angular.module('evtrsScrollApp')
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $provide) {

        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl : 'app/article/article-overview.html'
            })
            .state('create', {
                url: '/admin/create',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl'
            })
            .state('home.article', {
                url: '/article/:articleId',
                templateUrl: 'app/article/article-display.html',
                 controller: 'ArticleDisplayCtrl'

            });


        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$injector', function(taRegisterTool, taOptions, $injector){

            taRegisterTool('insertImg', {
                iconclass: "fa fa-picture-o",
                action: function(){
                   var rootScope= $injector.get('$rootScope');
                   rootScope.$broadcast('INSERT_IMAGE');
                }
            });

            return taOptions;
        }]);

    });





