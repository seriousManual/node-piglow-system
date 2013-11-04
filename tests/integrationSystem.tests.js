var expect = require('chai').expect;
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var testUtils = require('./util/util');

describe('integrationSystem', function() {

    it('should run', function() {
        var clock = sinon.useFakeTimers();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var System = sandboxed.require('../lib/modules/System', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        var mySystem = new System({}, [loadMock, cpuMock, memoryMock, temperatureMock]);

        mySystem.start();

        clock.tick(40000);

        expect(memoryMock.start.callCount).to.equal(1);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(1);
        expect(cpuMock.stop.callCount).to.equal(1);

        expect(loadMock.start.callCount).to.equal(1);
        expect(loadMock.stop.callCount).to.equal(0);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(1);

        clock.restore();
    });

    it('should run with a switchInterval', function() {
        var clock = sinon.useFakeTimers();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var System = sandboxed.require('../lib/modules/System', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        var mySystem = new System({ switchInterval: 5000}, [loadMock, cpuMock, memoryMock, temperatureMock]);

        mySystem.start();

        clock.tick(30000);

        expect(memoryMock.start.callCount).to.equal(2);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(2);
        expect(cpuMock.stop.callCount).to.equal(2);

        expect(loadMock.start.callCount).to.equal(1);
        expect(loadMock.stop.callCount).to.equal(1);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(1);

        clock.restore();
    });

    it('should run with a pauseInterval', function() {
        var clock = sinon.useFakeTimers();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var System = sandboxed.require('../lib/modules/System', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        var mySystem = new System({ pause: 5000}, [loadMock, cpuMock, memoryMock, temperatureMock]);

        mySystem.start();

        clock.tick(30000);

        expect(memoryMock.start.callCount).to.equal(1);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(1);
        expect(cpuMock.stop.callCount).to.equal(1);

        expect(loadMock.start.callCount).to.equal(0);
        expect(loadMock.stop.callCount).to.equal(0);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(0);

        clock.restore();
    });

    it('should run and stop', function() {
        var clock = sinon.useFakeTimers();

        var loadMock = testUtils.createModuleMock();
        var cpuMock = testUtils.createModuleMock();
        var memoryMock = testUtils.createModuleMock();
        var temperatureMock = testUtils.createModuleMock();

        var System = sandboxed.require('../lib/modules/System', {
            requires: {
                './memory': memoryMock,
                './load': loadMock,
                './cpu': cpuMock,
                './temperature': temperatureMock
            }
        });

        var mySystem = new System({ pause: 5000}, [loadMock, cpuMock, memoryMock, temperatureMock]);

        mySystem.start();

        clock.tick(30000);

        mySystem.stop();

        expect(memoryMock.start.callCount).to.equal(1);
        expect(memoryMock.stop.callCount).to.equal(1);

        expect(cpuMock.start.callCount).to.equal(1);
        expect(cpuMock.stop.callCount).to.equal(1);

        expect(loadMock.start.callCount).to.equal(0);
        expect(loadMock.stop.callCount).to.equal(0);

        expect(temperatureMock.start.callCount).to.equal(1);
        expect(temperatureMock.stop.callCount).to.equal(0);

        clock.restore();
    });
});
