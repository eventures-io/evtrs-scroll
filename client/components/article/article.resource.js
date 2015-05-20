'use strict';

angular.module('evtrsScrollApp').factory('ArticleResource', function (Restangular) {

    var articles = Restangular.all('articles');

    var getById = function (articleId) {
        return Restangular.one('articles', articleId).get();
    };

    var save = function (article) {
        return articles.post(article);
    };

    var getRecent = function (){
         return articles.customGETLIST('query/recent');
    };

    var getAll = function() {
        return articles.getList();
    }

    var findMatchingTypes = function(type) {
        var typeQuery = articles.all('types').all(type);
        return  typeQuery.getList();
    }

    return {
        getById : getById,
        getAll: getAll,
        save : save,
        getRecent : getRecent,
        findMatchingTypes : findMatchingTypes
    };
});