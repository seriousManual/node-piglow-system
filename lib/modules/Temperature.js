var os = require('os');
var fs = require('fs');
var util = require('util');

var Ticker = require('ptic');

var mapper = require('../mapper');
var Module = require('./Module');

function Temperature(piglowInterface, options) {
    Module.call(this, piglowInterface, options);

    this._ticker = new Ticker(this._interval);

    this._ticker.on('tick', this._updateCycle.bind(this, this._brightness));
}

util.inherits(Temperature, Module);

Temperature.prototype._updateCycle = function() {
    var that = this;

    fs.readFile('/sys/class/thermal/thermal_zone0/temp', function(error, fileContent) {
        if(error) {
            throw error;
        }

        var temperature = (+fileContent) / 1000;
        var temperaturPerc = temperature / 100;

        that._debug('perc: ', temperaturPerc);

        that._piglowInterface.startTransaction();
        that._piglowInterface.reset;
        mapper(0, temperaturPerc, that._brightness, that._piglowInterface);
        mapper(1, temperaturPerc, that._brightness, that._piglowInterface);
        mapper(2, temperaturPerc, that._brightness, that._piglowInterface);
        that._piglowInterface.commitTransaction();
    });
};

Temperature.prototype.start = function() {
    this._debug('starting');
    this._ticker.start();
};

Temperature.prototype.stop = function() {
    this._debug('stopping');
    this._piglowInterface.reset;

    this._ticker.stop();
};

Temperature.prototype.name = function() {
    return 'Temperature';
};

module.exports = Temperature;