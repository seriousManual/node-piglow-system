# node-piglow-load

[![Build Status](https://travis-ci.org/zaphod1984/node-piglow-load.png)](https://travis-ci.org/zaphod1984/node-piglow-load)

[![NPM](https://nodei.co/npm/piglow-load.png)](https://nodei.co/npm/piglow-load/)

[![NPM](https://nodei.co/npm-dl/piglow-load.png?months=3)](https://nodei.co/npm/piglow-load/)

node-piglow-load visualizes the load of the system.   
details for setting up your system can be found on the [node-piglow](https://github.com/zaphod1984/node-piglow) page.

## Installation

```
$ npm install piglow-load -g
```

## Run

### Command Line
```
$ piglow-load [-i interval] [-b brightness]
```

Parameters:

- `interval`: specifies the refresh interval in milliseconds. default: 5000ms
- `brightness`: specifies how bright the LED should shine. range: 0-255, default: 10 (fyi: 255 is freakin' bright)

#### End

End the `piglow-load` process via `ctr+c` or via sending a `SIGINT` signal, it will reset the piglow LEDs then.

### From your program:

```javascript
var piglowLoad = require('piglow-load');

var options = {
  interval: 1000, //the refresh interval, default:  5000
  brightness: 255 //the maximum brightness, range: 0-255, default: 100
};

piglowLoad.start(options);

process.on('SIGINT', end);

function end() {
    //resets all leds
    piglowLoad.stop(function() {
        process.exit();
    });
}
```

## made with
- **node-piglow** https://github.com/zaphod1984/node-piglow
- **optimist** https://github.com/substack/node-optimist
