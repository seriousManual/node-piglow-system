var load = require('./lib/modules/Load_');
var cpu = require('./lib/modules/Cpu_');
var memory = require('./lib/modules/Memory_');
var temperature = require('./lib/modules/Temperature_');
var system = require('./lib/modules/System_');

module.exports = {
    load: load,
    cpu: cpu,
    memory: memory,
    temperature: temperature,
    system: system
};