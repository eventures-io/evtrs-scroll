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

        $scope.close = function () {
            $state.go('base.home.contact');
        };

    });


angular.module('evtrsScrollApp').controller('AccordionController', function ($scope, ArticleResource) {

    $scope.addItem = function () {
        $scope.articles.push({
            title: $scope.title,
            content: $scope.content,
            collapsed: false
        });

        $scope.title = '';
        $scope.content = '';
    };


    ArticleResource.getRecent().then(function(response){
        var recent =  response.plain();
        $scope.articles = [
            {
                title: "Collapse Group Item Title 1",
                content: recent,
//            content: [{title: 'Article 1', type: 'blog'},{title: 'Article 2', type: 'picture'},{title: 'Article 3', type: 'prose' },{title: 'Article 4', type: 'rant'},{title: 'Article 5', type: 'rant'}],
                collapsed: false
            },
            {
                title: "Collapse Group Item Title 2",
                content: [{title: 'Article 1'}],
                collapsed: true
            },
            {
                title: "Collapse Group Item Title 3",
                content: [{title: 'Article 3'}],
                collapsed: true
            }
        ];
    })





});