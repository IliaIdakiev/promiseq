function sequance(items) {
    return new Promise(function(resolve, reject) {
        var counter = 0;
        var results = [];
        var resume = function(val) {
            counter++;
            iterable.next(val || null);
        };
        var rejector = function(err) {
            reject(err);
            gen.throw(err);
        };
        var gen = function* () {
            while(true){
                results.push(yield items[counter]().then(resume).catch(rejector));

                //var result = yield items[counter]().then(resume).catch(rejector);
                //results.push(result);
                if(counter === items.length) return resolve(results);
            }
        };

        var iterable = gen();
        iterable.next();
    });
}

module.exports = sequance; 