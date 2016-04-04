/*jshint esnext: true*/
function sequance(items, data) {
    if(items.length === 0) return Promise.resolve(data);
    return new Promise(function(resolve, reject) {
        var counter = 0;
        var results = [];
        var resume = function(val) {
            counter++;
            iterable.next(val || null);
        };
        var rejector = function(err) {
            reject(err);
        };
        var gen = function* () {
            while(true) {
                var prevResult = results[counter - 1] || undefined;
                var next = items[counter];
                if(typeof next === 'function') results.push(yield next(data, prevResult).then(resume).catch(rejector));
                else if(next instanceof Promise) results.push(yield next.then(resume).catch(rejector));
                else rejector(new Error('Array items must be either Promise or function returning a Promise'));
                if(counter === items.length) return resolve({ results, data });
            }
        };

        var iterable = gen();
        iterable.next();
    });
}

module.exports = sequance; 