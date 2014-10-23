'use strict';

angular.module('evtrsScrollApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article-create', {
                url: '/article-create',
                templateUrl: 'app/article/article-create.html',
                controller: 'ArticleCtrl'
            });
    });

angular.module('evtrsScrollApp').controller('ArticleCtrl', function ($scope, Article) {

    $scope.articleHtml = '';
    var newArticle =  new Article();

    $scope.save = function () {
        console.log('saving : ' + $scope.articleHtml);
        newArticle.content = $scope.articleHtml;
        newArticle.publDate = new Date();
        newArticle.type = 'blogpost';
        newArticle.$save()
        .then(function(data){
            console.log('successfully saved post: ' + data);
        });
    };


});