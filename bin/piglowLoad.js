#!/usr/bin/env node

var piglowLoad = require('../').load;
var binRun = require('./generic');

binRun(piglowLoad, 'load');