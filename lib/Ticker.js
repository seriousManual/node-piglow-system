var Emitter = require('events').EventEmitter;
var util = require('util');

function Ticker(interval) {
    Emitter.call(this);

    this._interval = interval || 1000;
    this._handle = null;
}

util.inherits(Ticker, Emitter);

Ticker.prototype._tick = function() {
    this.emit('tick');

    var duration = this._interval - ((new Date()).getMilliseconds() % this._interval);

    this._handle = setTimeout(this._tick.bind(this), duration);
};

Ticker.prototype.start = function() {
    this._tick();
};

Ticker.prototype.stop = function() {
    if(this._handle) {
        clearTimeout(this._handle);
    }
};

module.exports = Ticker;