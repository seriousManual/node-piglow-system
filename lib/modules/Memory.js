var os = require('os');
var util = require('util');

var piglow = require('piglow');
var Ticker = require('ptic');

var mapper = require('../mapper');
var Module = require('./Module');

function Memory(piglowInterface, options) {
    Module.call(this, piglowInterface, options);

    var that = this;
    this._ticker = new Ticker(this._interval);
    this._totalMemory = os.totalmem();

    this._ticker.on('tick', function() {
        var perc = os.freemem() / that._totalMemory;

        that._piglowInterface.startTransaction();
        that._piglowInterface.reset;
        mapper(0, perc, that._brightness, that._piglowInterface);
        mapper(1, perc, that._brightness, that._piglowInterface);
        mapper(2, perc, that._brightness, that._piglowInterface);
        that._piglowInterface.commitTransaction();
    });
}

util.inherits(Memory, Module);

Memory.prototype.start = function() {
    this._ticker.start();
};

Memory.prototype.stop = function(callback) {
    this._piglowInterface.reset;

    this._ticker.stop();

    process.nextTick(callback);
};

module.exports = Memory;