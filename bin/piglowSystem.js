#!/usr/bin/env node

var argv = require('optimist').argv;
var piglowSystem = require('../lib/modules/system');


var options = {modules: []};

if(argv.v || argv.version) {
    showVersion();
    process.exit(0);
}

if(argv.h || argv.help) {
    showHelp();
    process.exit(0);
}

if(argv.l)                        options.modules.push('l');
if(argv.c)                        options.modules.push('c');
if(argv.m)                        options.modules.push('m');

if(argv.i || argv.interval)       options.interval       = argv.i || argv.interval;
if(argv.b || argv.brightness)     options.brightness     = argv.b || argv.brightness;
if(argv.p || argv.pause)          options.pause          = argv.p || argv.pause;
if(argv.s || argv.switchInterval) options.switchInterval = argv.s || argv.switchInterval;

piglowSystem.start(options, function() {});

process.on('SIGINT', function end() {
    piglowSystem.stop(function() {
        process.exit();
    });
});


function showVersion() {
    console.log(require('../package.json').version);
}

function showHelp(name) {
    var help = [
        'Usage: piglow-system [modules] [options]',
        '',
        'Modules:',
        '  specify which modules should be rotated by simply providing the initial letter.',
        '  if no letter is specified all modules will be used. examples:',
        '    piglow-system -cl <- only shows cpu utilization and system load',
        '    piglow-system -lm <- only shows system load and free memory',
        '',
        'Options:',
        '  -b, --brightness:      the maximum brightness of the LEDs (range: 1-255, default: 100)',
        '  -i, --interval:        the refresh interval in ms (default: 1000)',
        '  -s, --switchInterval:  the time a certain module should be shown in ms (default: 10000)',
        '  -p, --pause:           pause between transitions in ms (default: 1000)',
        '  -v, --version:         the version of piglow-system',
        '  -h, --help:            this help'
    ];

    console.log(help.join('\n'));
}