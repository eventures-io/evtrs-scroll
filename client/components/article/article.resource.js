'use strict';

angular.module('evtrsScrollApp').factory('ArticleResource', function (Restangular, $cacheFactory) {

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
        return articles.withHttpConfig({ cache: true }).getList();
    }

    var findMatchingTypes = function(type) {
        var typeQuery = articles.all('types').all(type);
        return  typeQuery.getList();
    }

    var invalidateCache = function() {
        $cacheFactory.get('$http').removeAll();
    }

    return {
        getById : getById,
        getAll: getAll,
        save : save,
        getRecent : getRecent,
        findMatchingTypes : findMatchingTypes,
        invalidateCache : invalidateCache
    };
});