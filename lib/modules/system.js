var piglowCpu = require('./cpu');
var piglowLoad = require('./load');
var piglowMemory = require('./memory');

var clients = [];
var currentCliendId = 0;

var i1, i2, started;

function invoke(options, callback) {
    currentCliendId = (++currentCliendId) % clients.length;

    var myClient = clients[currentCliendId];

    myClient.start(options, function(error) {
        if(error) {
            return callback(error);
        }

        if(!started) {
            started = true;
            callback();
        }
    });

    i1 = setTimeout(function() {
        myClient.stop(function() {});

        i2 = setTimeout(function() {
            invoke(options, function() {});
        }, options.pause);
    }, options.switchInterval);
}

function start(options, callback) {
    options.switchInterval = options.switchInterval || 10000;
    options.pause = options.pause || 1000;

    clients = [];

    if(!options.modules || options.modules.length === 0) {
        clients = [piglowCpu, piglowLoad, piglowMemory];
    } else {
        if (options.modules.c) clients.push(piglowCpu);
        if (options.modules.l) clients.push(piglowLoad);
        if (options.modules.m) clients.push(piglowMemory);
    }

    invoke(options, callback);
}

function stop(callback) {
    clients[currentCliendId].stop(callback);

    clearTimeout(i1);
    clearTimeout(i2);
}

module.exports.stop = stop;
module.exports.start = start;