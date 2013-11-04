var util = require('util');

var cputilization = require('cputilization');

var mapper = require('../mapper');
var Module = require('./Module');

function Cpu(piglowInterface, options) {
    Module.call(this, piglowInterface, options);

    var that = this;
    this._sampler = cputilization({interval: this._interval, autoStart: false});

    this._sampler.on('sample', function(sample) {
        var utilisation = sample.percentageBusy();

        that._debug('utilisation: ' + utilisation);

        that._piglowInterface.startTransaction();
        that._piglowInterface.reset;
        mapper(0, utilisation, that._brightness, that._piglowInterface);
        mapper(2, utilisation, that._brightness, that._piglowInterface);
        mapper(1, utilisation, that._brightness, that._piglowInterface);
        that._piglowInterface.commitTransaction();
    });
}

util.inherits(Cpu, Module);

Cpu.prototype.start = function() {
    this._debug('starting');
    this._sampler.start();
};

Cpu.prototype.stop = function() {
    this._debug('stopping');
    this._piglowInterface.reset;

    this._sampler.stop();
};

Cpu.prototype.name = function() {
    return 'Cpu';
};

module.exports = Cpu;
