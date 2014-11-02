'use strict';

var evtrs = evtrs || {};


evtrs.scrollToAnchor = function (anchorName) {
    $('html, body').animate({
        scrollTop: $('#'.concat(anchorName)).offset().top
    }, 1200, 'easeInOutExpo');
};


angular.module('evtrsScrollApp')
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);


        $stateProvider
            .state('base', {
                abstract: true,
                url: '/',
                templateUrl: 'app/main/main.html'

            })
            .state('base.home', {
                abstract: true,
                url: '',
                views: {
                    'intro-view@base': { templateUrl: 'app/main/partials/intro.part.html' },
                    'about-view@base': { templateUrl: 'app/main/partials/about.part.html' },
                    'services-view@base': { templateUrl: 'app/main/partials/services.part.html'}
                }
            })
            .state('base.home.intro', {
                url: '',
                views: {
                    'intro-sub-view@base.home': { template: '',
                        controller: function ($scope) {
                            $scope.$on('$viewContentLoaded',
                                function () {
                                    evtrs.scrollToAnchor('page-top');
                                });

                        }
                    }
                }
            })
            .state('base.home.about', {
                url: 'about',
                views: {
                    'about-sub-view@base.home': { template: '',
                        controller: function ($scope) {
                            $scope.$on('$viewContentLoaded',
                                function ( ) {
                                    evtrs.scrollToAnchor('about');
                                });

                        }
                    }
                }
            })
            .state('base.home.services', {
                url: 'services',
                views: {
                    'services-sub-view@base.home': { template: '',
                        controller: function ($scope) {
                            $scope.$on('$viewContentLoaded',
                                function ( ) {
                                    evtrs.scrollToAnchor('services');

                                });
                        }
                    }
                }
            })
            .state('base.home.services.things', {
                url: '/things',
                views: {
                    'services-sub-view@base.home': { templateUrl: 'app/main/partials/services.things.html',
                        controller: function ($scope) {
                            $scope.things = ['A', 'Set', 'Of', 'Things'];
                            $scope.$on('$viewContentLoaded',
                                function ( ) {
                                    evtrs.scrollToAnchor('services');

                                });
                        }
                    }
                }
            })
            .state('base.home.services.items', {
                url: '/items',
                views: {
                    'services-sub-view@base.home': { templateUrl: 'app/main/partials/services.items.html',
                        controller: function ($scope) {
                            $scope.items = ['A', 'List', 'Of', 'Items'];
                            $scope.$on('$viewContentLoaded',
                                function ( ) {
                                    evtrs.scrollToAnchor('services');

                                });

                        }
                    }
                }
            });

        });


