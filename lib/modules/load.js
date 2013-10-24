var os = require('os');

var piglow = require('piglow');
var mapper = require('../mapper');
var Ticker = require('../Ticker');

var _piglowInterface, _initialized, _ticker;

function _initialize(interval, callback) {
    if(_initialized) {
        return process.nextTick(callback);
    }

    piglow(function(error, piglowInterface) {
        if(error) {
            return callback(error);
        }

        _ticker = new Ticker(interval);

        _piglowInterface = piglowInterface;
        _initialized = true;

        callback();
    });
}

function _startUpdateCylce(brightness) {
    _ticker.on('tick', function() {
        _piglowInterface.startTransaction();
        _piglowInterface.reset;
        _mapLoadToLeds(os.loadavg(), brightness);
        _piglowInterface.commitTransaction();
    });

    _ticker.start();
}

function _mapLoadToLeds(loads, brightness) {
    loads.forEach(function(load, index) {
        mapper(index, load, brightness, _piglowInterface);
    });
}

function start(options, callback) {
    options = options || {};

    var interval = options.interval || 5000;
    var brightness = options.brightness ? piglow.processValue(options.brightness) : 10;

    _initialize(interval, function(error) {
        if(error) {
            return callback(error);
        }

        _startUpdateCylce(brightness);
        callback();
    });
}

function stop(callback) {
    _piglowInterface.reset;

    _ticker.stop();

    process.nextTick(callback);
}

module.exports.stop = stop;
module.exports.start = start;
module.exports.name = 'load';