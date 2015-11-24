#Sequential promise executor for ES2015

Module for executing promises in sequense.

####Installing:
```
npm install promisequance
```

####Usage:
```javascript
var promiseq = require('promisequance');

function one(prevValue, data) {
    return new Promise(function(resolve, reject) {
        //prevValue: undefined
        //data = { value: 200 }
        setTimeout(function() {
            resolve('1');
        },1000);
    });
}

function two(prevValue, data) {
    return new Promise(function(resolve, reject) {
        //prevValue: 1
        //data = { value: 200 }
        setTimeout(function() {
            resolve('2');
        },1000);
    });
}
var someData = {
    value: 200
};

promiseq([one, two], someData).then(function(values) {
    console.log(values.results[0]) // '1'
    console.log(values.results[1]) // '2'
    console.log(values.data.value) // 200
});
```