var piglow = require('piglow');
var argv = require('optimist').argv;

function binRun(ClientClass, name) {
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
        showHelp(name);
        process.exit(0);
    }

    piglow(function(error, piglowInterface) {
        if(error) {
            console.log(error.message);

            process.exit(1);
        }

        var client = new ClientClass(piglowInterface, options);

        client.start();

        process.on('SIGINT', function end() {
            client.stop(function() {
                process.exit();
            });
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
