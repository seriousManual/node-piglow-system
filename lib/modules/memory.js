var os = require('os');

var piglow = require('piglow');

var mapper = require('../mapper');
var Ticker = require('../Ticker');

var _piGlowInterface, _initialized, _ticker;
var totalMemory = os.totalmem();

function _initialize(interval, brightness, callback) {
    if(_initialized) {
        return process.nextTick(callback);
    }

    piglow(function(error, piGlowInterface) {
        if(error) {
            return callback(error);
        }

        _piGlowInterface = piGlowInterface;
        _initialized = true;


        _ticker = new Ticker(interval);

        _ticker.on('tick', function() {
            var perc = os.freemem() / totalMemory;

            _piGlowInterface.startTransaction();
            _piGlowInterface.reset;
            mapper(0, perc, brightness, _piGlowInterface);
            mapper(1, perc, brightness, _piGlowInterface);
            mapper(2, perc, brightness, _piGlowInterface);
            _piGlowInterface.commitTransaction();
        });

        callback()
    });
}

function _startUpdateCylce() {
    _ticker.start();
}

function start(options, callback) {
    options = options || {};

    var interval = options.interval || 1000;
    var brightness = options.brightness ? piglow.processValue(options.brightness) : 10;

    _initialize(interval, brightness, function(error) {
        if(error) {
            return callback(error);
        }

        _startUpdateCylce();

        callback(null);
    });
}

function stop(callback) {
    _piGlowInterface.reset;

    _ticker.stop();

    process.nextTick(callback);
}

module.exports.stop = stop;
module.exports.start = start;
module.exports.name = 'memory';