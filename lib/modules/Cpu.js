var util = require('util');

var piglow = require('piglow');
var cputilization = require('cputilization');

var mapper = require('../mapper');
var Module = require('./Module');

function Cpu(piglowInterface, options) {
    Module.call(this, piglowInterface, options);

    var that = this;
    this._sampler = cputilization({interval: this._interval, autoStart: false});

    this._sampler.on('sample', function(sample) {
        var utilisation = sample.percentageBusy();

        that._piglowInterface.startTransaction();
        that._piglowInterface.reset;
        mapper(0, utilisation, that._brightness, that._piglowInterface);
        mapper(2, utilisation, that._brightness, that._piglowInterface);
        mapper(1, utilisation, that._brightness, that._piglowInterface);
        that._piglowInterface.commitTransaction();
    });
}

util.inherits(Cpu, Module);

Cpu.prototype.start = function(callback) {
    this._sampler.start();
};

Cpu.prototype.stop = function(callback) {
    this._piglowInterface.reset;

    this._sampler.stop();

    process.nextTick(callback);
};

module.exports = Cpu;
