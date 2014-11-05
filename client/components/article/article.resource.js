'use strict';

angular.module('evtrsScrollApp').factory('ArticleResource', function (Restangular) {

    var articles = Restangular.all('articles');

    var getById = function (articleId) {
        return articles.one(articleId).get();
    };

    var save = function (article) {
        return articles.post(article);
    };

    var update = function (article) {
        return articles.put(article);
    };

    var getRecent = function (){
         return articles.customGETLIST('query/recent');
    };

    return {
        getById : getById,
        save : save,
        update : update,
        getRecent : getRecent
    };
});