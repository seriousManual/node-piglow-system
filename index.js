var load = require('./lib/modules/Load');
var cpu = require('./lib/modules/Cpu');
var memory = require('./lib/modules/Memory');
var temperature = require('./lib/modules/Temperature');
var system = require('./lib/modules/System');

module.exports = {
    load: load,
    cpu: cpu,
    memory: memory,
    temperature: temperature,
    system: system
};