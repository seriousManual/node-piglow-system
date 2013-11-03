# node-piglow-system

[![Build Status](https://travis-ci.org/zaphod1984/node-piglow-system.png)](https://travis-ci.org/zaphod1984/node-piglow-system)

[![NPM](https://nodei.co/npm/piglow-system.png)](https://nodei.co/npm/piglow-system/)

[![NPM](https://nodei.co/npm-dl/piglow-system.png?months=3)](https://nodei.co/npm/piglow-system/)

node-piglow-system visualizes several metrics of your system via the pimoroni piglow.
details for setting up your system can be found on the [node-piglow](https://github.com/zaphod1984/node-piglow) page.

## Installation

```
$ npm install piglow-system -g
```

## Modules

node-piglow-system is a collection of several modules that visualize system metrics.
currently the following modules are available:

- **load** visualizes the system load. 1Minute, 5Minute and 15Minute load is distributed onto the three arms
- **cpu** visualizes the current cpu utilization
- **memory** visualizes the current memory utilization
- **temperature** measures and visualizes the current SOC temperature
- **system** runs all the above modules consecutively

## Run



### Command Line
```
$ piglow-load [-i interval] [-b brightness]
$ piglow-cpu [-i interval] [-b brightness]
$ piglow-memory [-i interval] [-b brightness]
$ piglow-temperature [-i interval] [-b brightness]
$ piglow-system [-lcmt] [-i interval] [-b brightness] [-s switchInterval] [-p pause]
```

All parameters are strictly optional.

Parameters (all modules):

- `interval`: specifies the refresh interval in milliseconds. default: 5000ms
- `brightness`: specifies how bright the LED should shine. range: 0-255, default: 10 (fyi: 255 is freakin' bright)

Parameters (system):

- `lcmt`: each letter stands for one of the diagnostic modules. use the parameter to choose which should be used. if ommitted all will be used (which does not make too much sense since it's obviously difficult to differ between memory usage and temperature, both are quite stable over time)
- `switchInterval`: specifies the time a module call lasts, default: 10000
- `pause`: specifies the pause time between to module calls, default: 1000

#### End

End the process via `ctr+c` or via sending a `SIGINT` signal, it will reset the piglow LEDs then.

### From your program:

each of the modules follows the exact same api (load is used as the example):

```javascript
var Load = require('piglow-system').load;

var options = {
  interval: 1000, //the refresh interval, default:  5000
  brightness: 255 //the maximum brightness, range: 0-255, default: 100
};

//inject an piglowinterface here
var myLoad = new Load(piglowInterface, options)

piglowLoad.start();

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
- **cputilization** https://github.com/zaphod1984/cputilization
