var promiseq = require('./promiseq');
var should = require('chai').should();

describe('simple sequential promises tests', function() {
    it('should exec all promises in seq and return result', function(done) {

        var testFunc1 = function(data) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    data.func1 = 'func1';
                    resolve('testFunc1');
                }, 1);
            });
        };
        var testFunc2 = function(data, prevResult) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    data.func2 = 'func2';
                    resolve('testFunc2');
                }, 1);
            });
        };
        var testFunc3 = function(data, prevResult) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    data.func3 = 'func3';
                    resolve('testFunc3');
                }, 100);
            });
        };

        promiseq([testFunc1, testFunc2, testFunc3], { start: 'someData' }).then(function(values) {
            values.results[0].should.equal('testFunc1');
            values.results[1].should.equal('testFunc2');
            values.results[2].should.equal('testFunc3');

            values.data.start.should.equal('someData');
            values.data.func1.should.equal('func1');
            values.data.func2.should.equal('func2');
            values.data.func3.should.equal('func3');
            console.log('First finished ...');

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

    it('should resolve when array is empty', function() {
        var list = [];
        var func1 = function(list) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() { 
                    resolve(list);
                }, 10);
            });
        };

        var func2 = function() {
            done();
        };

        func1(list).then(promiseq).then(func2);
    });
});