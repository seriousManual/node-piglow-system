var os = require('os');
var fs = require('fs');

var piglow = require('piglow');
var Ticker = require('ptic');

var mapper = require('../mapper');

var _piglowInterface, _initialized, _ticker;

function _initialize(interval, brightness, callback) {
    if(_initialized) {
        return process.nextTick(callback);
    }

    piglow(function(error, piglowInterface) {
        if(error) {
            return callback(error);
        }

        _piglowInterface = piglowInterface;
        _initialized = true;

        _ticker = new Ticker(interval);

        _ticker.on('tick', updateCycle.bind(this, brightness));

        callback();
    });
}

function updateCycle(brightness) {
    fs.readFile('/sys/class/thermal/thermal_zone0/temp', function(error, fileContent) {
        if(error) {
            throw error;
        }

        var temperature = (+fileContent) / 1000;
        var temperaturPerc = temperature / 100;

        _piglowInterface.startTransaction();
        _piglowInterface.reset;
        mapper(0, temperaturPerc, brightness, _piglowInterface);
        mapper(1, temperaturPerc, brightness, _piglowInterface);
        mapper(2, temperaturPerc, brightness, _piglowInterface);
        _piglowInterface.commitTransaction();
    });
}

function _startUpdateCylce() {
    _ticker.start();
}

function start(options, callback) {
    options = options || {};

    var interval = options.interval || 5000;
    var brightness = options.brightness ? piglow.processValue(options.brightness) : 10;

    _initialize(interval, brightness, function(error) {
        if(error) {
            return callback(error);
        }

        _startUpdateCylce();
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