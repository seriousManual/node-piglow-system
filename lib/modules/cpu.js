var os = require('os');

var piglowInterface = require('piglow');
var cputilization = require('cputilization');

var mapper = require('./lib/mapper');

var piGlow, sampler;

function start(options) {
    options = options || {};

    var repeatInterval = options.interval || 1000;
    var brightness = options.brightness ? piGlow.processValue(options.brightness) : 10;

    piglowInterface(function(error, piGlowHandler) {
        piGlow = piGlowHandler;

        if(error) {
            console.log('couldn\'t set up interface: ' + error.message);
            return;
        }

        startUpdateCylce(repeatInterval, brightness, piGlow);
    });
}

function stop(callback) {
    piGlow.reset;

    if(sampler) {
        sampler.stop();
    }

    process.nextTick(callback);
}

function startUpdateCylce(interval, brightness, piGlow) {
    sampler = cputilization({interval: interval});

    sampler.on('sample', function(sample) {
        var util = sample.percentageBusy();

        piGlow.reset;

        piGlow.startTransaction();
        mapper(0, util, brightness, piGlow);
        mapper(1, util, brightness, piGlow);
        mapper(2, util, brightness, piGlow);
        piGlow.stopTransaction();
    });
}

module.exports.stop = stop;
module.exports.start = start;
