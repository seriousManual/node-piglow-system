var load = require('./lib/modules/load');
var cpu = require('./lib/modules/cpu');
var memory = require('./lib/modules/memory');
var system = require('./lib/modules/system');

module.exports = {
    load: load,
    cpu: cpu,
    memory: memory,
    system: system
};