var sinon = require('sinon');

function createFSMock(error, results) {
    var pointer = 0;
    return {
        readFile: function(path, callback) {
            if(error) {
                callback(error, null);
            } else {
                callback(null, results[pointer]);
            }

            pointer = ++pointer % results.length;
        }
    }
}

function createModuleMock() {
    var started = false;

    return {
        start: sinon.spy(function(o, callback) {
            if(!started) {
                started = true;
                callback();
            }
        }),
        stop: sinon.spy(function(callback) {
            callback();
        })
    };
}

function createSystemMock() {
    return {
        cpu: createModuleMock(),
        load: createModuleMock()
    };
}

function createCPUMock(samples) {
    var e = {
        _handler: null,
        on: function(type, handler) {
            this._handler = handler;
        }
    };

    return function(o) {
        var interval = o.interval;
        var samplePointer = 0;

        function runner() {
            if(e._handler) {
                e._handler({
                    percentageBusy: function() {
                        return samples[samplePointer++ % samples.length];
                    }
                });
            }

            var duate = interval - ((new Date()).getMilliseconds() % interval);
            setTimeout(runner, duate);
        }

        runner();

        return e;
    };
}

function createCreateInterface(error, mock) {
    var ret = function(callback) {
        if(error) {
            callback(error, null);
        } else {
            callback(null, mock);
        }
    };

    ret.processValue = function(value) { return value; };

    return ret;
}

function createPiGlowMock() {
    return {
        "startTransaction": function() {},
        "commitTransaction": function() {},
        "l_0_0": 0, "l_0_1": 0, "l_0_2": 0, "l_0_3": 0, "l_0_4": 0, "l_0_5": 0,
        "l_1_0": 0, "l_1_1": 0, "l_1_2": 0, "l_1_3": 0, "l_1_4": 0, "l_1_5": 0,
        "l_2_0": 0, "l_2_1": 0, "l_2_2": 0, "l_2_3": 0, "l_2_4": 0, "l_2_5": 0,
        "data": function() {
            return JSON.parse(JSON.stringify(this));
        }
    };
}

function createOsMock(loadValues, totalmem, freeMemValues) {
    var loadIndex = 0;
    var memIndex = 0;

    return {
        loadavg: function() {
            var res = loadValues[loadIndex];

            loadIndex = (++loadIndex) % loadValues.length;

            return res;
        },
        totalmem: function() {
            return totalmem;
        },
        freemem: function() {
            var res = freeMemValues[memIndex];

            memIndex = (++memIndex) % freeMemValues.length;

            return res;
        }
    };
}

module.exports.createCreateInterface = createCreateInterface;
module.exports.createPiGlowMock = createPiGlowMock;
module.exports.createOsMock = createOsMock;
module.exports.createCPUMock = createCPUMock;
module.exports.createModuleMock = createModuleMock;
module.exports.createSystemMock = createSystemMock;
module.exports.createFSMock = createFSMock;