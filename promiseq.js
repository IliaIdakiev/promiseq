/*jshint esnext: true*/
function sequance(items, data) {
    if(items.length === 0) return Promise.resolve();
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
                results.push(yield items[counter](prevResult, data).then(resume).catch(rejector));
                if(counter === items.length) return resolve({ results, data });
            }
        };

        var iterable = gen();
        iterable.next();
    });
}

module.exports = sequance; 