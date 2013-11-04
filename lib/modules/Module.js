var piglow = require('piglow');

var depugger = require('../debug');

function Module(piglowInterface, options) {
    options = options || {};

    this._debug = depugger({debug: !!options.debug, name: this.name()});
    this._piglowInterface = piglowInterface;
    this._interval = options.interval || 1000;
    this._brightness = options.brightness ? piglow.processValue(options.brightness) : 10;

    this._debug('initialized with: ' + JSON.stringify(options));
}

module.exports = Module;