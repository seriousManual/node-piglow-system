#!/usr/bin/env node

var piglowLoad = require('../').load;

var argv = require('optimist').argv;

var options = {};

if(argv.i || argv.interval) {
    options.interval = argv.i || argv.interval;
}

if(argv.b || argv.brightness) {
    options.brightness = argv.b || argv.brightness;
}

if(argv.v || argv.version) {
    showVersion();
    process.exit(0);
}

if(argv.h || argv.help) {
    showHelp();
    process.exit(0);
}

piglowLoad.start(options);

process.on('SIGINT', end);

function end() {
    piglowLoad.stop(function() {
        process.exit();
    });
}

function showVersion() {
    console.log(require('../package.json').version);
}

function showHelp() {
    var help = [
        'Usage: piglow-load [options]',
        '',
        'Options:',
        '  -b, --brightness: the maximum brightness of the LEDs (default: 100)',
        '  -i, --interval:   the refresh interval (default: 1000)',
        '  -v, --version:    the version of piglow-load',
        '  -h, --help:       this help'
    ];

    console.log(help.join('\n'));
}