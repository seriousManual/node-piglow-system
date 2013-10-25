var Emitter = require('events').EventEmitter;
var util = require('util');

/**
 * EventEmitter that emits 'tick' events at a specific interval
 * More precise as setInterval, resyncs itself
 * @param interval the repeat interval in ms, default: 1000
 * @constructor
 */
function Ticker(interval) {
    Emitter.call(this);

    this._interval = interval || 1000;
    this._handle = null;
}

util.inherits(Ticker, Emitter);

/**
 * the tick function, internal
 * @private
 */
Ticker.prototype._tick = function() {
    this.emit('tick');

    var duration = this._interval - ((new Date()).getMilliseconds() % this._interval);

    this._handle = setTimeout(this._tick.bind(this), duration);
};

/**
 * start the ticker
 */
Ticker.prototype.start = function() {
    this._tick();
};

/**
 * stop the ticker
 */
Ticker.prototype.stop = function() {
    if(this._handle) {
        clearTimeout(this._handle);
    }
};

module.exports = Ticker;