var os = require('os');

var piglowInterface = require('piglow');

var mapper = require('../mapper');

var piGlow, intervalHandle;

function start(options) {
    options = options || {};

    var repeatInterval = options.interval || 5000;
    var brightness = options.brightness ? piglowInterface.processValue(options.brightness) : 10;

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
    clearInterval(intervalHandle);

    process.nextTick(callback);
}

function startUpdateCylce(interval, brightness, piGlow) {
    intervalHandle = setInterval(makeUpdate, interval);

    makeUpdate();

    function makeUpdate() {
        piGlow.reset;

        piGlow.startTransaction();
        mapLoadToLeds(os.loadavg(), brightness, piGlow);
        piGlow.commitTransaction();
    }
}

function mapLoadToLeds(loads, brightness, piGlow) {
    loads.forEach(function(load, index) {
        mapper(index, load, brightness, piGlow);
    });
}

module.exports.stop = stop;
module.exports.start = start;
