var os = require('os');
var util = require('util');

var Ticker = require('ptic');

var mapper = require('../mapper');
var Module = require('./Module');

function Load(piglowInterface, options) {
    var that = this;
    Module.call(this, piglowInterface, options);

    this._ticker = new Ticker(this._interval);

    this._ticker.on('tick', function() {
        var load = os.loadavg();
        that._debug('loadavg: ' + load);

        that._piglowInterface.startTransaction();
        that._piglowInterface.reset;
        that._mapLoadToLeds(load);
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
    this._debug('starting');
    this._ticker.start();
};

Load.prototype.stop = function() {
    this._debug('stopping');
    this._piglowInterface.reset;

    this._ticker.stop();
};

Load.prototype.name = function() {
    return 'Load';
};

module.exports = Load;