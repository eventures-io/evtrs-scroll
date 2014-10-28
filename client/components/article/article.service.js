'use strict';

angular.module('evtrsScrollApp').service('Articles', function (Restangular) {

    var articles = Restangular.all('articles')

    this.getById = function (articleId) {
        return articles.one(articleId).get();
    }

    this.save = function (article) {
        return articles.post(article);
    }

    this.update = function (article) {
        return articles.put(article);
    }

});