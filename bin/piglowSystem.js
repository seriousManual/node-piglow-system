#!/usr/bin/env node

var argv = require('optimist').argv;
var piglowSystem = require('../');
var piglowCpu = piglowSystem.cpu;
var piglowLoad = piglowSystem.load;

if(argv.v || argv.version) {
    showVersion();
    process.exit(0);
}

if(argv.h || argv.help) {
    showHelp();
    process.exit(0);
}

var clients = [piglowCpu, piglowLoad];
var currentCliendId = 0;

var options = {};
var switchInterval = argv.s || argv.switch || 10000;
var pauseTime = 1000;

var i1, i2;

if(argv.i || argv.interval) {
    options.interval = argv.i || argv.interval;
}

if(argv.b || argv.brightness) {
    options.brightness = argv.b || argv.brightness;
}

invoke();

process.on('SIGINT', function end() {
    clients[currentCliendId].stop();

    clearTimeout(i1);
    clearTimeout(i2);
});



function invoke() {
    currentCliendId = (++currentCliendId) % clients.length;

    var myClient = clients[currentCliendId];

    myClient.start(options);

    i1 = setTimeout(function() {
        myClient.stop();

        i2 = setTimeout(invoke, pauseTime);
    }, switchInterval);
}

function showVersion() {
    console.log(require('../package.json').version);
}

function showHelp() {
    var help = [
        'Usage: piglow-system [options]',
        '',
        'Options:',
        '  -b, --brightness: the maximum brightness of the LEDs (default: 100)',
        '  -i, --interval:   the refresh interval of the submodules (default: 1000)',
        '  -s, --switch:     the time in ms between module switches (default: 10000)',
        '  -v, --version:    the version of piglow-system',
        '  -h, --help:       this help'
    ];

    console.log(help.join('\n'));
}