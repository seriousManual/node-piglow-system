var piglow = require('piglow');

function Module(piglowInterface, options) {
    options = options || {};

    this._piglowInterface = piglowInterface;
    this._interval = options.interval || 1000;
    this._brightness = options.brightness ? piglow.processValue(options.brightness) : 10;
}

module.exports = Module;