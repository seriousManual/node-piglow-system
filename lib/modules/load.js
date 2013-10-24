var os = require('os');

var piglow = require('piglow');
var mapper = require('../mapper');

var _piglowInterface, _intervalHandler, _initialized;

function _initialize(callback) {
    if(_initialized) {
        return process.nextTick(callback);
    }

    piglow(function(error, piglowInterface) {
        if(error) {
            return callback(error);
        }

        _piglowInterface = piglowInterface;
        _initialized = true;

        callback();
    });
}

function _startUpdateCylce(interval, brightness) {
    _intervalHandler = setInterval(_makeUpdate, interval);

    _makeUpdate();

    function _makeUpdate() {
        _piglowInterface.reset;

        _piglowInterface.startTransaction();
        mapLoadToLeds(os.loadavg(), brightness);
        _piglowInterface.commitTransaction();
    }
}

function mapLoadToLeds(loads, brightness) {
    loads.forEach(function(load, index) {
        mapper(index, load, brightness, _piglowInterface);
    });
}

function start(options, callback) {
    options = options || {};

    var repeatInterval = options.interval || 5000;
    var brightness = options.brightness ? piglow.processValue(options.brightness) : 10;

    _initialize(function(error) {
        if(error) {
            return callback(error);
        }

        _startUpdateCylce(repeatInterval, brightness);
        callback();
    });
}

function stop(callback) {
    _piglowInterface.reset;
    clearInterval(_intervalHandler);

    process.nextTick(callback);
}

module.exports.stop = stop;
module.exports.start = start;
module.exports.name = 'load';