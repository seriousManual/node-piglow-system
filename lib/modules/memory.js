var os = require('os');

var piglow = require('piglow');

var mapper = require('../mapper');

var _piGlowInterface, _intervalHandle, _initialized;
var totalMemory = os.totalmem();

function _initialize(callback) {
    if(_initialized) {
        return process.nextTick(callback);
    }

    piglow(function(error, piGlowInterface) {
        if(error) {
            return callback(error);
        }

        _piGlowInterface = piGlowInterface;
        _initialized = true;

        callback()
    });
}

function _startUpdateCylce(interval, brightness) {
    _intervalHandle = setInterval(function() {
        var perc = os.freemem() / totalMemory;

        _piGlowInterface.startTransaction();
        _piGlowInterface.reset;
        mapper(0, perc, brightness, _piGlowInterface);
        mapper(1, perc, brightness, _piGlowInterface);
        mapper(2, perc, brightness, _piGlowInterface);
        _piGlowInterface.commitTransaction();
    }, interval)
}

function start(options, callback) {
    options = options || {};

    var repeatInterval = options.interval || 1000;
    var brightness = options.brightness ? piglow.processValue(options.brightness) : 10;

    _initialize(function(error) {
        if(error) {
            return callback(error);
        }

        _startUpdateCylce(repeatInterval, brightness);

        callback(null);
    });
}

function stop(callback) {
    _piGlowInterface.reset;

    if(_intervalHandle) {
        clearInterval(_intervalHandle);
    }

    process.nextTick(callback);
}

module.exports.stop = stop;
module.exports.start = start;
module.exports.name = 'memory';