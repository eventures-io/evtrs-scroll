'use strict'
describe('Controller : ArticleCtrl', function () {

    var articleResourceStub,
        $q,
        $rootScope,
        $scope,
        deferred;

    beforeEach(module('evtrsScrollApp'));

    beforeEach(function() {
        articleResourceStub = sinon.stub({'save': function (article) {
            return deferred.promise;
        }});
        module(function ($provide) {
            $provide.value('ArticleResource', articleResourceStub);
        });

    })
    beforeEach(inject(function (_$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        deferred = $q.defer();
    }));

    beforeEach(inject(function ($controller) {
        $scope = $rootScope.$new();
        $controller('ArticleCtrl', {'$scope': $scope});
        articleResourceStub.save.returns(deferred.promise);

    }));

    describe('initialize', function () {
        it('should initialize a new article and reset saveAction, submitted on the $scope', function () {
            $scope.article = {title: 'testTitle'};
            $scope.initialize();
            expect($scope.saveAction).toEqual('Save');
            expect($scope.submitted).toBe(false);
        })
    });

    describe('save article', function () {
        it('should call save on ArticleResource', function () {
            $scope.save({$valid: true});
            deferred.resolve({_id: 1, title: 'test title 1', content: 'test 1 content'});
            $rootScope.$apply();
            expect(articleResourceStub.save.called).toBe(true);
            expect($scope.article.title).toEqual('test title 1');
            expect($scope.saveAction).toEqual('Update');
        })
    });
});

describe('Controller : ArticleDisplayCtrl', function () {

    var articleResourceStub,
        $q,
        $rootScope,
        $scope,
        deferred;

    beforeEach(module('evtrsScrollApp'));

    beforeEach(function () {
        articleResourceStub = sinon.stub({'getById': function () {
        }});
        module(function ($provide) {
            $provide.value('ArticleResource', articleResourceStub);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        deferred = $q.defer();
        $scope = $rootScope.$new();
        articleResourceStub.getById.returns(deferred.promise);
        $controller('ArticleDisplayCtrl', {$scope: $scope, $stateParams: {articleId: '2'}});
    }));

    describe('load article', function () {
        it('should call getById on ArticleResource', function () {
            deferred.resolve({_id: 2, title: 'test title 2', content: 'test 2 content'});
            $rootScope.$apply();
            expect(articleResourceStub.getById.calledWith('2')).toBe(true);
            expect($scope.article.title).toEqual('test title 2');
            expect($scope.article.content).toEqual('test 2 content');
        })
    });


});