'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/articles', function () {

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
                //TODO load lodash
               // _size(res.body).should.equal(5);
                done();
            });
    });

});
