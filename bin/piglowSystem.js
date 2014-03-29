#!/usr/bin/env node

var piglow = require('piglow');

var argv = require('optimist').argv;
var modules = require('../index');

if(argv.v || argv.version) {
    showVersion();
    process.exit(0);
}

if(argv.h || argv.help) {
    showHelp();
    process.exit(0);
}

var options = {};

if(argv.i || argv.interval)       options.interval       = argv.i || argv.interval;
if(argv.b || argv.brightness)     options.brightness     = argv.b || argv.brightness;
if(argv.s || argv.switchInterval) options.switchInterval = argv.s || argv.switchInterval;
if(argv.d || argv.debug)          options.debug          = true;
if(argv.p !== undefined)          options.pause          = +argv.p;
if(argv.pause !== undefined)      options.pause          = +argv.pause;

piglow(function(error, piglowInterface) {
    if(error) {
        console.log(error.message);

        process.exit(1);
    }

    startup(piglowInterface, options, argv);
});

function startup(piglowInterface, options, argv) {
    var clients = [];

    if(argv.l || argv.c || argv.m || argv.t) {
        if(argv.l) clients.push(new modules.load(piglowInterface, options));
        if(argv.c) clients.push(new modules.cpu(piglowInterface, options));
        if(argv.m) clients.push(new modules.memory(piglowInterface, options));
        if(argv.t) clients.push(new modules.temperature(piglowInterface, options));
    } else {
        clients = [
            new modules.load(piglowInterface, options),
            new modules.cpu(piglowInterface, options),
            new modules.memory(piglowInterface, options),
            new modules.temperature(piglowInterface, options)
        ];
    }

    var system = new modules.system(options, clients);

    system.start();

    process.on('SIGINT', function end() {
        system.stop();

        setTimeout(function() {
            process.exit();
        }, 300);
    });
}

function showVersion() {
    console.log(require('../package.json').version);
}

function showHelp() {
    var help = [
        'Usage: piglow-system [modules] [options]',
        '',
        'Modules:',
        '  specify which modules should be rotated by simply providing the initial letter.',
        '  possible value: c, l, m, t',
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
        '  -d, --debug:           activate debug output',
        '  -h, --help:            this help'
    ];

    console.log(help.join('\n'));
}
