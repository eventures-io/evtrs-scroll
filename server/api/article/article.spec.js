'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var _ = require('lodash');
var User = require('../user/user.model');
var Article = require('./article.model');
var agent = request.agent(app);


describe('POST /api/articles', function () {

    before(function (done) {
        var user = new User({
            provider: 'local',
            name: 'Admin Test User',
            email: 'admin@test.com',
            password: 'pswd',
            role: 'admin'
        });
        user.save(function (err, user) {
            if (err) return done(err);
            done();
        });
    });

    it('login first', loginAdmin());

    it('should return an article with populated id', function (done) {
        agent
            .post('/api/articles')
            .send({title: "Test Title", content: 'test content', publDate: new Date()})
            // .expect(304)
            //.expect('Content-Type', /json/)
            .end(function (err, res) {
                console.log('end post article');
                if (err) return done(err);
                //res.body.should.be.instanceof();
                done();

            });
    });

});


describe('GET /api/articles', function () {

    before('insert test articles', function (done) {
        Article.find({}).remove(function () {
            var date = new Date();
            for (var i = 0; i < 10; i++) {
                date.setDate(date.getDate() + i);
                var article = new Article({
                    title: 'title_' + i,
                    content: 'content_' + i,
                    type: 'TESTPOST',
                    publDate: date
                });
                article.save(function (err, user) {
                    if (err) return done(err);

                });
            }
            done();
        });
    });

    it('should respond with JSON array', function (done) {
        request(app)
            .get('/api/articles')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});

describe('GET /api/articles/recent', function () {

    it('should respond with JSON array', function (done) {
        request(app)
            .get('/api/articles/query/recent')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                _.size(res.body).should.equal(5);
                var _article;
              res.body.forEach(function(article) {
                    if(!_article){
                    _article = article
                    }
                    else {
                    //   (article.publDate < _article.publDate).should.be.ok;;
                        _article = article;
                    }
                });
                done();
            });
    });

});


function loginAdmin() {
    return function (done) {
        agent
            .post('/auth/local')
            .send({ email: 'admin@test.com', password: 'pswd' })
            .expect(200)
            .end(function (err, res) {
                console.log('end authenticate');
                if (err) return done(err);
//                 agent.saveCookies(res);
                //       should.exist(res.headers['set-cookie']);
                return done();
            });
    }
}