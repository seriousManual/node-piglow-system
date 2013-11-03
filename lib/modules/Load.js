var os = require('os');
var util = require('util');

var piglow = require('piglow');
var Ticker = require('ptic');

var mapper = require('../mapper');
var Module = require('./Module');

function Load(piglowInterface, options) {
    var that = this;
    Module.call(this, piglowInterface, options);

    this._ticker = new Ticker(this._interval);

    this._ticker.on('tick', function() {
        that._piglowInterface.startTransaction();
        that._piglowInterface.reset;
        that._mapLoadToLeds(os.loadavg());
        that._piglowInterface.commitTransaction();
    });
}

util.inherits(Load, Module);

Load.prototype._mapLoadToLeds = function(loads) {
    var that = this;

    loads.forEach(function(load, index) {
        mapper(index, load, that._brightness, that._piglowInterface);
    });
};

Load.prototype.start = function() {
    this._ticker.start();
};

Load.prototype.stop = function() {
    this._piglowInterface.reset;

    this._ticker.stop();
};

module.exports = Load;