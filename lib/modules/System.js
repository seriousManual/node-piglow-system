var depugger = require('../debug');

function System(options, clients) {
    this._iHandle1 = null;
    this._iHandle2 = null;
    this._clients = clients || [];
    this._currentClientId = 0;

    this._switchInterval = options.switchInterval || 10000;
    this._pause = options.pause || 1000;

    this._debug = depugger({name: 'System', debug: !!options.debug});
}

System.prototype._invoke = function() {
    var that = this;
    this._currentClientId = (++this._currentClientId) % this._clients.length;

    var myClient = this._clients[this._currentClientId];

    this._debug('starting client ' + this._currentClientId);
    myClient.start();

    this._iHandle1 = setTimeout(function() {
        myClient.stop();

        that._debug('pausing for ' + that._pause);
        if(that._pause) {
            this._iHandle2 = setTimeout(function() {
                that._invoke();
            }, that._pause);
        } else {
            that._invoke();
        }
    }, that._switchInterval);
};

System.prototype.start = function() {
    this._invoke();
};

System.prototype.stop = function() {
    clearTimeout(this._iHandle1);
    clearTimeout(this._iHandle2);
};

System.prototype.name = function() {
    return 'System';
};

module.exports = System;