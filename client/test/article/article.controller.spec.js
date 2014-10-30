'use strict'
describe('ArticleCtrl : save', function () {

    beforeEach(module('evtrsScrollApp'));

    var articleResource, articleController, scope, $rootScope;

    beforeEach(inject(function ($controller, _$rootScope_, _ArticleResource_, $q) {
        $rootScope =_$rootScope_;
        articleResource = _ArticleResource_;
        scope = $rootScope.$new();
        articleController = $controller('ArticleCtrl', {$scope: scope, ArticleResource : articleResource});
        spyOn(articleResource, "save").andCallFake(function() {
            var deferred = $q.defer();
            deferred.resolve({_id: 2});
            return deferred.promise;
        });

    }));

    it('should be defined', function () {
        expect(articleController).toBeDefined();
    });

    it('should call the save method on articleResource', function () {
        scope.article = {};
        scope.save({$valid: true});
        $rootScope.$apply();
        expect(articleResource.save).toHaveBeenCalled();
        expect(scope.article._id).toBe(2);

    });

});

