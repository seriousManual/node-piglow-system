var expect = require('chai').expect;
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var testUtils = require('./util/util');

describe('integrationSystem', function() {

    it('should run', function() {
        var clock = sinon.useFakeTimers();
        var callback = sinon.stub();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        piglowSystem.start({}, callback);

        clock.tick(40000);

        expect(callback.callCount).to.equal(1);

        expect(memoryMock.start.callCount).to.equal(1);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(1);
        expect(cpuMock.stop.callCount).to.equal(0);

        expect(loadMock.start.callCount).to.equal(1);
        expect(loadMock.stop.callCount).to.equal(1);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(1);

        clock.restore();
    });

    it('should run with a switchInterval', function() {
        var clock = sinon.useFakeTimers();
        var callback = sinon.stub();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        piglowSystem.start({switchInterval:5000}, callback);

        clock.tick(30000);

        expect(callback.callCount).to.equal(1);

        expect(memoryMock.start.callCount).to.equal(2);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(1);
        expect(cpuMock.stop.callCount).to.equal(1);

        expect(loadMock.start.callCount).to.equal(2);
        expect(loadMock.stop.callCount).to.equal(2);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(1);

        clock.restore();
    });

    it('should run with a pauseInterval', function() {
        var clock = sinon.useFakeTimers();
        var callback = sinon.stub();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        piglowSystem.start({pause: 5000}, callback);

        clock.tick(30000);

        expect(callback.callCount).to.equal(1);

        expect(memoryMock.start.callCount).to.equal(1);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(0);
        expect(cpuMock.stop.callCount).to.equal(0);

        expect(loadMock.start.callCount).to.equal(1);
        expect(loadMock.stop.callCount).to.equal(1);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(0);

        clock.restore();
    });

    it('should run and stop', function() {
        var clock = sinon.useFakeTimers();
        var callbackStart = sinon.stub();
        var callbackStop = sinon.stub();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        piglowSystem.start({pause: 5000}, callbackStart);

        clock.tick(30000);

        piglowSystem.stop(callbackStop);

        expect(callbackStart.callCount).to.equal(1);
        expect(callbackStop.callCount).to.equal(1);

        expect(memoryMock.start.callCount).to.equal(1);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(0);
        expect(cpuMock.stop.callCount).to.equal(0);

        expect(loadMock.start.callCount).to.equal(1);
        expect(loadMock.stop.callCount).to.equal(1);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(1);

        clock.restore();
    });
});
