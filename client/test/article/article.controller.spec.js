'use strict'
describe('Controller : ArticleCtrl', function () {

    var articleResourceStub, scope;

    beforeEach(module('evtrsScrollApp'));


    beforeEach(function () {

        articleResourceStub = sinon.stub({'getById': function () {
        }, 'save': function () {
        }});
        articleResourceStub.getById.returns({then: function () {
        }});

        module(function ($provide) {
            $provide.value('ArticleResource', articleResourceStub);
        });
    });

    beforeEach(inject(function ($controller, $rootScope, $q) {
        scope = $rootScope.$new();
        $controller('ArticleCtrl', {$scope: scope, $stateParams: {articleId: '1'}});
    }));


    describe("load article", function () {
        it('should call getById on ArticleResource', function () {
            expect(articleResourceStub.getById.calledWith('1')).toBe(true);
        })
    });

    describe("save article", function () {
        it('should call save on ArticleResource', function () {
            articleResourceStub.save.returns({then: function () {
            }});
            scope.article = {};
            scope.save({$valid: true});
            expect(articleResourceStub.save.calledWith(scope.article)).toBe(true);
        })
    });


});
