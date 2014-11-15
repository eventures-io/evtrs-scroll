'use strict';
angular.module('evtrsScrollApp')
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);


        $stateProvider
            .state('base', {
                abstract: true,
                url: '/',
                controller: 'MainCtrl',
                templateUrl: 'app/main/main.html',

            })
            .state('base.home', {
                abstract: true,
                url: '',
                views: {
                    'intro-view@base': { templateUrl: 'app/main/intro.html' },
                    'about-view@base': { templateUrl: 'app/about/about.html' },
                    'services-view@base': { templateUrl: 'app/services/services.html'}
                }
            })
            .state('base.home.intro', {
                url: '',
                views: {
                    'intro-sub-view@base.home': {
                        template: ''
                    }
                },
                data: {
                    elementId: 'page-top'
                }
            })
            .state('base.home.about', {
                url: 'about',
                views: {
                    'about-sub-view@base.home': {
                        template: ''
                    }
                },
                data: {
                    elementId: 'about'
                }
            })
            .state('base.home.services', {
                url: 'services',
                views: {
                    'services-sub-view@base.home': {
                        template: ''
                    }
                },
                data: {
                    elementId: 'services'
                }
            })
            .state('base.home.services.article', {
                url: '/article/:articleId',
                views: {
                    'services-sub-view@base.home': { templateUrl: 'app/article/article-display.html',
                        controller: 'ArticleDisplayCtrl'
                    }
                }, data: {
                    elementId: 'contact'
                }
            })
            .state('base.home.contact', {
                url: 'contact',
                data: {
                    elementId: 'contact'
                }
            });

    });





