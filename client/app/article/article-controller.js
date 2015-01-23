'use strict';

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, ArticleResource) {

        $scope.article = {};
        $scope.saveAction = 'Save';
        $scope.submitted = false;


    $scope.save = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            if ($scope.saveAction === 'Save') {
                $scope.article.publDate = new Date();
                ArticleResource.save($scope.article)
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
        };

        $scope.close = function() {
            $state.go('base.home.contact');
        };

    });


angular.module('evtrsScrollApp').controller('AccordionController', function($scope) {


    $scope.addItem = function() {
        $scope.collapseData.push({
            title: $scope.title,
            content: $scope.content,
            collapsed: false
        });

        $scope.title = '';
        $scope.content = '';
    };

    $scope.collapseData = [
        {
            title: "Collapse Group Item Title 1",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
            collapsed: false
        },
        {
            title: "Collapse Group Item Title 2",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
            collapsed: false
        },
        {
            title: "Collapse Group Item Title 2",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
            collapsed: false
        }
    ];
});