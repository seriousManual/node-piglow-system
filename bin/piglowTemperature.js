#!/usr/bin/env node

var piglowLoad = require('../').temperature;
var binRun = require('./generic');

binRun(piglowLoad, 'temperature');