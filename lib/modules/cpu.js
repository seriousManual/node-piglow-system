var piglow = require('piglow');
var cputilization = require('cputilization');

var mapper = require('../mapper');

var _piGlowInterface, _sampler, _initialized;

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
    _sampler = cputilization({interval: interval});

    _sampler.on('sample', function(sample) {
        var util = sample.percentageBusy();

        _piGlowInterface.startTransaction();
        _piGlowInterface.reset;
        mapper(0, util, brightness, _piGlowInterface);
        mapper(1, util, brightness, _piGlowInterface);
        mapper(2, util, brightness, _piGlowInterface);
        _piGlowInterface.commitTransaction();
    });
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

    if(_sampler) {
        _sampler.stop();
    }

    process.nextTick(callback);
}

module.exports.stop = stop;
module.exports.start = start;
module.exports.name = 'cpu';
