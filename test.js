var promiseq = require('./promiseq');
var should = require('chai').should();

describe('simple sequential promises tests', function() {
    it('should exec all promises in seq and return result', function(done) {
        var testFunc1 = function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve('testFunc1');
                }, 1);
            });
        };
        var testFunc2 = function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve('testFunc2');
                }, 1);
            });
        };
        var testFunc3 = function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve('testFunc3');
                }, 100);
            });
        };

        promiseq([testFunc1, testFunc2, testFunc3]).then(function(values) {
            values[0].should.equal('testFunc1');
            values[1].should.equal('testFunc2');
            values[2].should.equal('testFunc3');
            done();
        });
    });


    it('should return error', function(done) {
        var testFunc1 = function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    reject(new Error('testFunc1 Error'));
                }, 0);
            });
        };
        var testFunc2 = function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve('testFunc2');
                }, 0);
            });
        };
        var testFunc3 = function(){
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve('testFunc3');
                }, 0);
            });
        };

        promiseq([testFunc1, testFunc2, testFunc3]).catch(function(err){
            err.message.should.equal('testFunc1 Error');
            done();
        });
    });
});