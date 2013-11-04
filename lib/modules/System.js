var depugger = require('../debug');

function System(options, clients) {
    this._iHandle1 = null;
    this._iHandle2 = null;
    this._clients = clients || [];
    this._currentClientId = 0;

    this._switchInterval = options.switchInterval || 10000;
    this._pause = options.pause !== undefined ? +options.pause : 1000;

    this._debug = depugger({name: 'System', debug: !!options.debug});

    this._debug('initialized with: ' + JSON.stringify(options));
}

System.prototype._invoke = function(clientIdOverwrite) {
    var that = this;

    var myClient = this.nextClient();

    this._debug('starting client "' + myClient.name() + '", switching in ' + that._switchInterval);
    myClient.start();

    this._iHandle1 = setTimeout(function() {
        myClient.stop();

        if(that._pause) {
            that._debug('pausing for ' + that._pause);

            this._iHandle2 = setTimeout(function() {
                that._invoke();
            }, that._pause);
        } else {
            that._debug('not pausing');

            that._invoke();
        }
    }, that._switchInterval);
};

System.prototype.nextClient = function() {
    this._currentClientId = (++this._currentClientId) % this._clients.length;

    return this.currentClient();
};

System.prototype.currentClient = function() {
    return this._clients[this._currentClientId];
};

System.prototype.running = function() {
    return this._iHandle1 !== null;
};

System.prototype.start = function() {
    this._debug('starting');
    this._invoke(0);
};

System.prototype.stop = function() {
    this._debug('stopping');

    if(!this.running()) {
        return;
    }

    this.currentClient().stop();
    clearTimeout(this._iHandle1);
    clearTimeout(this._iHandle2);

    this._iHandle1 = null;
    this._iHandle2 = null;
};

System.prototype.name = function() {
    return 'System';
};

module.exports = System;