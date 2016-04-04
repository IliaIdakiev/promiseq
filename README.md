[![Build Status](https://travis-ci.org/IliaIdakiev/promiseq.svg?branch=master)](https://travis-ci.org/IliaIdakiev/promiseq)<br>
#Sequential promise executor for ES2015

Module for executing promises in sequence.

####Installing:
```
npm install promisequence
```

####Usage:
```javascript
var promiseq = require('promisequence');

function one(result) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(result);
        },1000);
    });
}

function two(data, prevValue) {
    return new Promise(function(resolve, reject) {
        //prevValue: '1'
        //data = { value: 200 }
        setTimeout(function() {
            resolve('2');
        },1000);
    });
}
var someData = {
    value: 200
};

promiseq([Promise.resolve('0'), one(1), two], someData).then(function(values) {
    console.log(values.results[0]) // '0'
    console.log(values.results[1]) // '1'
    console.log(values.results[2]) // '2'
    console.log(values.data.value) // 200
});
```