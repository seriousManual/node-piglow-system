var argv = require('optimist').argv;

function binRun(client) {
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
        showHelp(client.name);
        process.exit(0);
    }

    client.start(options);

    process.on('SIGINT', function end() {
        client.stop(function() {
            process.exit();
        });
    });
}


function showVersion() {
    console.log(require('../package.json').version);
}

function showHelp(name) {
    var help = [
        'Usage: piglow-' + name + ' [options]',
        '',
        'Options:',
        '  -b, --brightness: the maximum brightness of the LEDs (default: 100)',
        '  -i, --interval:   the refresh interval (default: 1000)',
        '  -v, --version:    the version of piglow-' + name,
        '  -h, --help:       this help'
    ];

    console.log(help.join('\n'));
}

module.exports = binRun;